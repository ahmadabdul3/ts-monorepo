import React from "react";

import {
    onChangeDefault,
    useFormInputState,
    FormField,
    Input
} from "./form-input";
import styles from "./form-input.module.css";

function IconPlaceholder() {
    return <div className={styles.iconPlaceholder} />;
}


export function useFormPasswordInput({
    label = 'Password',
    name = '',
    error = '',
    value = '',
    message = '',
    onChange = onChangeDefault,
    uncontrolled = false,
    isRequired = true,
} = {}) {
    const state = useFormInputState({
        onChange,
        isRequired,
    });

    return {
        value: state.value,
        error: state.error,
        getPasswordInputConfig: state.getInputConfig,
        passwordInput: (
            <FormPasswordInput
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

export function FormPasswordInput({
    label = 'Password',
    message = '',
    name = '',
    error = '',
    value = '',
    onChange = onChangeDefault,
    onBlur = onChangeDefault,
    uncontrolled = true,
}) {

    const [showText, setShowText] = React.useState(false);
    const handleClick = () => {
        setShowText(s => !s);
    };

    return (
        <FormField
            label={label}
            message={message}
            error={error}
            field={(
                <Input
                    type={showText ? 'text' : 'password'}
                    error={error}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    uncontrolled={uncontrolled}
                />
            )}
            endContent={<div onClick={handleClick}><IconPlaceholder /></div>}
        />
    );
}