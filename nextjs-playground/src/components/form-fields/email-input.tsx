import {
    useFormInputState,
    FormField,
    Input,
    onChangeDefault,
} from "./form-input";


export function useFormEmailInput({
    onChange = onChangeDefault,
    onBlur = onChangeDefault,
    label = 'Email',
    name = '',
    isRequired = true,
} = {}) {
    const {
        value: _val,
        error,
        message,
        onChange: _onChange,
        onBlur: _onBlur,
        setError,
        getInputConfig,
    } = useFormInputState({
        onChange,
        onBlur,
        isRequired,
        validate
    });

    function validate({ value = '' } = {}) {
        const parts = value.split('@');

        let invalidFormat = false;

        // - if length is 1, that means there was no @ symbol
        //   and a true split didnt happen
        if (parts.length === 1) invalidFormat = true;
        // - part before @ is empty (x@y.c) <- missing 'x'
        else if (!parts[0]) invalidFormat = true;
        // - part after @ is empty (x@y.c) <- missing 'y.c'
        else if (!parts[1]) invalidFormat = true;

        const invalidEmailError = 'Invalid format (ex@email.co)';

        if (invalidFormat) {
            setError(invalidEmailError);
            return { isValid: false };
        }

        const partsAfterAt = parts[1].split('.');

        // - if length is 1, then there was no '.'
        //   and a true split didnt happen
        if (partsAfterAt.length === 1) invalidFormat = true;
        // - part before . is empty (x@y.c) <- missing 'y'
        else if (!partsAfterAt[0]) invalidFormat = true;
        // - part after . is empty (x@y.c) <- missing 'c'
        else if (!partsAfterAt[1]) invalidFormat = true;

        if (invalidFormat) {
            setError(invalidEmailError);
            return { isValid: false }
        }

        return { isValid: true };
    }


    return {
        value: _val,
        error,
        getEmailInputConfig: getInputConfig,
        emailInput: (
            <FormEmailInput
                onChange={_onChange}
                onBlur={_onBlur}
                label={label}
                message={message}
                name={name}
                error={error}
                value={_val}
                uncontrolled={false}
            />
        ),
    }
}

export function FormEmailInput({
    label = 'Email',
    message = '',
    name = '',
    error = '',
    value = '',
    uncontrolled = true,
    onChange = onChangeDefault,
    onBlur = onChangeDefault,
}) {
    return (
        <FormField
            label={label}
            message={message}
            error={error}
            field={(
                <Input
                    onChange={onChange}
                    error={error}
                    name={name}
                    onBlur={onBlur}
                    value={value}
                    uncontrolled={uncontrolled}
                />
            )}
        />
    );
}