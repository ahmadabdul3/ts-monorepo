import React, { ReactNode, Fragment } from "react";
import {
    Text,
    TextError
} from '@/components/typography';
import {
    FormFieldContainer,
} from "@/components/form-fields/form-input";

// type submitHandler = () => Promise<void>;

type formProps = {
    children?: ReactNode,
    buttons?: ReactNode,
    onSubmit?: Function,
    inputConfigs?: Array<formFieldConfig>,
    message?: string,
    error?: string,
    handleSubmitRef?: any,
}

interface formFieldConfig {
    validate(): boolean;
}

export function useForm(props: formProps) {
    const [loading, setLoading] = React.useState(false);
    const handleSubmitRef = React.useRef(() => { });

    async function handleSubmit() {
        if (loading) {
            console.warn('form loading, cant submit again');
            return;
        }
        let isValid = true;
        props.inputConfigs?.forEach(c => {
            const valid = c.validate();
            if (!valid) isValid = false;
        });

        if (!isValid) {
            console.warn('cant submit form, there are invalid fields');
            return;
        }
        setLoading(true);

        try {
            await props.onSubmit?.();
        } catch (e) {
            console.log('*** error:', e);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        handleSubmitRef.current = handleSubmit;
    }, [props.inputConfigs, props.onSubmit])

    return {
        formLoading: loading,
        // form: <Form {...props} onSubmit={handleSubmit} />,
        // - we dont want this callback to be recalculated when
        //   the inputConifgs or onSubmit change
        // - one reason is, the input configs change very time
        //   an input is modified
        // - this causes the entire form to re-render, which
        //   removes focus from the input being typed in
        // - to avoid this, we put handleSubmit in a ref
        //   so that the Form component calls its '.current' field
        //   and gets the most up-to-date submit function without
        //   having to re-render
        // - otherwise it gets a cached version of the function
        //   with the original inputConfigs and the form can never
        //   be submitted
        Form: React.useCallback((formProps: formProps) => (
            <Form {...formProps} handleSubmitRef={handleSubmitRef} />
        ), [props.message, props.error]),
    };
}

export function Form({
    onSubmit,
    handleSubmitRef,
    children,
    buttons,
    message,
    error,
}: formProps) {
    async function handleSubmit(e: any) {
        e.preventDefault();
        onSubmit?.();
        handleSubmitRef.current?.();
    }

    return (
        <form onSubmit={handleSubmit}>
            {children}
            <FormMessages message={message} error={error} />
            {buttons}
        </form>
    );
}

function FormMessages({ message = '', error = '' }) {
    const content = (
        <Fragment>
            {message && <Text>{message}</Text>}
            {error && <TextError>{error}</TextError>}
        </Fragment>
    );

    if (message || error) {
        return (
            <FormFieldContainer>
                {content}
            </FormFieldContainer>
        );
    }

    return content;
}