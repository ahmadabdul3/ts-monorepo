'use client'
import styles from "./form-input.module.css";
import cx from 'classnames';
import React, { ReactNode } from 'react';
import {
    MessageBasic,
    MessageError
} from '@/components/typography';

type formFieldProps = {
    label: string,
    field?: ReactNode,
    message: string,
    error: string,
    endContent?: ReactNode,
};

type formFieldContainer = {
    children?: ReactNode,
}

export function FormFieldContainer({
    children = ''
}: formFieldContainer) {
    return (
        <div className={styles.formFieldContainer}>
            {children}
        </div>
    );
}

export function FormField({
    label,
    field,
    message,
    error,
    endContent,
}: formFieldProps) {

    return (
        <FormFieldContainer>
            {label && <FormFieldLabel>{label}</FormFieldLabel>}
            <div className={styles.formFieldInputContainer}>
                {
                    endContent && (
                        <div className={styles.formFieldEndContent}>
                            {endContent}
                        </div>
                    )
                }
                {field}
            </div>
            {message && <MessageBasic>{message}</MessageBasic>}
            {error && <MessageError>{error}</MessageError>}
        </FormFieldContainer>
    );
}

export function FormFieldLabel({ children = '' }) {
    return (
        <label className={styles.formFieldLabel}>
            {children}
        </label>
    );
}


export type onChangeParams = {
    e: any,
    name: string,
    value: string,
};

export function onChangeDefault(params: onChangeParams) { }


export function Input({
    type = 'text',
    name = '',
    value = '',
    error = '',
    uncontrolled = false,
    onChange = onChangeDefault,
    onBlur = onChangeDefault
}) {
    const _onChange = React.useCallback((e: any) => {
        onChange({ e, name, value: e.target.value });
    }, [onChange]);

    const _onBlur = React.useCallback((e: any) => {
        onBlur({ e, name, value: e.target.value });
    }, [onBlur]);

    let val: string | undefined = value;
    if (uncontrolled) val = undefined;

    return (
        <input
            className={cx(styles.basicInput, { [styles.basicInputError]: error })}
            type={type}
            name={name}
            onChange={_onChange}
            onBlur={_onBlur}
            value={val}
        />
    );
}



export function useFormInputState({
    onChange = onChangeDefault,
    onBlur = onChangeDefault,
    validate = ({ value = '' }) => ({ isValid: true }),
    isRequired = false,
}) {
    const touchedRef = React.useRef(false);
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isValidField, setIsValidField] = React.useState(false);

    React.useEffect(() => {
        if (!isRequired) setIsValidField(true);
    }, []);

    const resetMessages = () => {
        clearError();
        setMessage('');
    };

    const clearError = () => {
        setError('');
        setIsValidField(true);
    }

    const markError = (v: string) => {
        setError(v);
        setIsValidField(false);
    }

    const _validate = ({ value = '' } = {}) => {
        // - if the field is required and we dont
        //   have a value, we might clear the
        //   'error', but the field is still invalid
        if (isRequired && !value) {
            markError('This field is required');
            return false;
        }

        const { isValid } = validate({ value });
        if (!isValid) return false;

        // - if we reach this point, the field is valid
        //   so we can clear errors
        clearError();
        return true;
    };

    const _onChange = React.useCallback((props: onChangeParams) => {
        // console.log('*** on change', value);
        setValue(props.value);
        if (!error) resetMessages();
        else {
            // - if theres an error we want
            //   to validate on each change
            //   to clear the error out when
            //   a correct email is submitted
            setMessage('');
            _validate({ value: props.value });
        }
        onChange?.(props);
    }, [error, onChange]);

    const _onBlur = React.useCallback((props: onChangeParams) => {
        touchedRef.current = true;
        // console.log('*** on blur', value);
        resetMessages();
        _validate({ value: props.value });
        onBlur?.(props);
    }, [onBlur]);

    return {
        value,
        error,
        message,
        // - this should only ever be used to set
        //   an actual error
        // - clearing errors should happen internally
        //   (for now)
        // - we can make that assumption (for now)
        setError: (val = '') => {
            if (!val) {
                console.warn('attempting to clear error externally, abort');
                return;
            }

            markError(val);
        },
        setMessage,
        onChange: _onChange,
        onBlur: _onBlur,
        getInputConfig: () => ({
            validate: () => {
                // - if we never touched the field, validate it
                //   (this will be called from the form component)
                // - if we touched the field, it was already
                //   validated, and no need to run validation again
                let validVal = isValidField;
                if (!touchedRef.current) {
                    validVal = _validate({ value });
                }

                return validVal;
            }
        }),
    };
}

export function useFormTextInput({
    label = '',
    name = '',
    error = '',
    value = '',
    message = '',
    onChange = onChangeDefault,
    uncontrolled = false,
    isRequired = false,
} = {}) {
    const state = useFormInputState({
        onChange,
        isRequired,
    });

    return {
        value: state.value,
        error: state.error,
        getTextInputConfig: state.getInputConfig,
        textInput: (
            <FormTextInput
                label={label}
                message={message || state.message}
                name={name}
                error={error || state.error}
                value={value || state.value}
                onChange={state.onChange}
                onBlur={state.onBlur}
                uncontrolled={uncontrolled}
            />
        ),
    };
}

export function FormTextInput({
    label = '',
    message = '',
    name = '',
    error = '',
    value = '',
    onChange = onChangeDefault,
    onBlur = onChangeDefault,
    uncontrolled = true,
}) {
    return (
        <FormField
            label={label}
            message={message}
            error={error}
            field={(
                <Input
                    error={error}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    uncontrolled={uncontrolled}
                />
            )}
        />
    );
}



// - example usages:
// export default function Home() {
//     const { emailInput } = useFormEmailInput();
//     const { textInput } = useFormTextInput({
//         label: 'Full Name',
//         isRequired: true,
//     });

//     return (
//         <div className={styles.page}>
//             <div>
//                 {emailInput}
//                 <FormTextInput
//                     label='Password'
//                     uncontrolled
//                 />
//                 {textInput}
//                 <FormPasswordInput />
//             </div>
//         </div>
//     );
// }