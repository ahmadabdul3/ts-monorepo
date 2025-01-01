'use client'

// import Image from "next/image";
import styles from "./page.module.css";
import { FormFieldContainer } from "@/components/form-fields/form-input";
import { useFormEmailInput } from "@/components/form-fields/email-input";
import { useFormPasswordInput } from "@/components/form-fields/password-input";
import {
    // Button,
    ButtonPrimary,
    // ButtonsContainer
} from '@/components/buttons';
import { Color, ContentBox } from '@/components/content-box';
import { useForm } from '@/components/form-fields/form';
import { simulateAsync } from "@/util/async-simulator";

export default function Home() {
    const { emailInput, getEmailInputConfig } = useFormEmailInput();
    const { passwordInput, getPasswordInputConfig } = useFormPasswordInput();
    const { Form, formLoading } = useForm({
        onSubmit: async () => {
            try {
                const res = await simulateAsync<string>({
                    returnVal: 'success',
                    asSuccess: true,
                });
                console.log('*** response: ', res);
            } catch (e) {
                console.log('*** error: ', e);
            }
        },
        inputConfigs: [
            getEmailInputConfig(),
            getPasswordInputConfig(),
        ],
    });

    return (
        <div className={styles.page}>
            <ContentBox debug>
                <Form
                    buttons={(
                        <FormFieldContainer>
                            <ButtonPrimary fullWidth loading={formLoading}>
                                Log In
                            </ButtonPrimary>
                        </FormFieldContainer>
                    )}
                >
                    {emailInput}
                    {passwordInput}
                </Form>
            </ContentBox>
            <ContentBox debug backgroundColor={Color.primaryAccentLight} />
            <ContentBox debug backgroundColor={Color.primary} />
            <ContentBox debug backgroundColor={Color.primaryAccentDark} />

            <ContentBox debug backgroundColor={Color.secondaryAccentLight} />
            <ContentBox debug backgroundColor={Color.secondary} />
            <ContentBox debug backgroundColor={Color.secondaryAccentDark} />


        </div>
    );
}
