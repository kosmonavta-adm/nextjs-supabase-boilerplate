'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLocaleContext } from '@/commons/providers/LocaleProvider';
import { getFormErrorMessage, url } from '@/commons/utils';
import { registerUser } from '@/components/auth/_authActions';
import { AUTH_FORM_ERRORS_KEYS, authFormErrorMessagesDict } from '@/components/auth/_authUtils';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import { useToast } from '@/components/ui/Toast/useToast';

export const REGISTER = {
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
} as const;

const registerFormDict = {
    pl: {
        registerPanel: 'Panel rejestracji',
        email: 'Email',
        password: 'Hasło',
        confirmPassword: 'Potwierdź hasło',
        createAccount: 'Załóż konto',
        alreadyHaveAccount: 'Masz już konto?',
        login: 'Zaloguj się',
        or: 'lub',
        error: 'An error occurred, please try again later.',
        registerMessage: 'Wiadomość e-mail z potwierdzeniem została wysłana. Sprawdź swoją skrzynkę odbiorczą.',
    },
    en: {
        registerPanel: 'Register panel',
        email: 'Email',
        password: 'Password',
        createAccount: 'Create an account',
        confirmPassword: 'Confirm password',
        alreadyHaveAccount: 'Do you already have an account?',
        login: 'Login',
        or: 'or',
        error: 'An error occurred, please try again later.',
        registerMessage: 'The confirmation email has been sent. Check your email inbox.',
    },
};

const RegisterForm = () => {
    const { toast } = useToast();

    const locale = useLocaleContext();
    const t = registerFormDict[locale];
    const tFormErrorMessages: Record<string, string> = authFormErrorMessagesDict[locale];

    const registerSchema = z
        .object({
            [REGISTER.EMAIL]: z.string().email(AUTH_FORM_ERRORS_KEYS.INCORRECT_EMAIL),
            [REGISTER.PASSWORD]: z.string().min(6, AUTH_FORM_ERRORS_KEYS.PASSWORD_MIN_LENGTH),
            [REGISTER.CONFIRM_PASSWORD]: z.string(),
        })
        .refine(
            (values) => {
                return values[REGISTER.PASSWORD] === values[REGISTER.CONFIRM_PASSWORD];
            },
            {
                message: AUTH_FORM_ERRORS_KEYS.PASSWORDS_DOESNT_MATCH,
                path: [REGISTER.CONFIRM_PASSWORD],
            }
        );

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            [REGISTER.EMAIL]: '',
            [REGISTER.PASSWORD]: '',
            [REGISTER.CONFIRM_PASSWORD]: '',
        },
    });

    const handleRegister = async (formData: z.infer<typeof registerSchema>) => {
        const { confirmPassword: _, ...registerData } = formData;
        const error = await registerUser(registerData);

        if (error) toast({ description: 'An error occurred, try again later.' });
    };

    return (
        <section className="flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">{t.registerPanel}</h1>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="flex flex-col gap-6"
            >
                {formState.isSubmitSuccessful ? (
                    <p>{t.registerMessage}</p>
                ) : (
                    <>
                        <Input
                            label={{
                                value: (
                                    <>
                                        <span className="text-red-600">*</span> {t.email}
                                    </>
                                ),
                            }}
                            placeholder="example@mail.com"
                            error={getFormErrorMessage(formState.errors[REGISTER.EMAIL]?.message, tFormErrorMessages)}
                            {...register(REGISTER.EMAIL)}
                        />
                        <Input
                            type="password"
                            label={{
                                value: (
                                    <>
                                        <span className="text-red-600">*</span> {t.password}
                                    </>
                                ),
                            }}
                            error={getFormErrorMessage(
                                formState.errors[REGISTER.PASSWORD]?.message,
                                tFormErrorMessages
                            )}
                            {...register(REGISTER.PASSWORD)}
                        />
                        <Input
                            type="password"
                            label={{
                                value: (
                                    <>
                                        <span className="text-red-600">*</span> {t.confirmPassword}
                                    </>
                                ),
                            }}
                            error={getFormErrorMessage(
                                formState.errors[REGISTER.CONFIRM_PASSWORD]?.message,
                                tFormErrorMessages
                            )}
                            {...register(REGISTER.CONFIRM_PASSWORD)}
                        />

                        <Button
                            className="w-full"
                            type="submit"
                            disabled={formState.isSubmitting}
                        >
                            {formState.isSubmitting ? <Loader /> : t.createAccount}
                        </Button>
                    </>
                )}
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <hr className="my-4" />
                <p className="font-medium">{t.or}</p>
                <hr className="my-4" />
            </div>
            <p>
                {t.alreadyHaveAccount}{' '}
                <CustomLink
                    className="font-bold text-green-400 hover:text-green-600"
                    href={url.login}
                >
                    {t.login}
                </CustomLink>
            </p>
        </section>
    );
};

export default RegisterForm;
