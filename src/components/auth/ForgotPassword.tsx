'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLocaleContext } from '@/commons/providers/LocaleProvider';
import { getFormErrorMessage, url } from '@/commons/utils';
import { resetPassword } from '@/components/auth/_authActions';
import { AUTH_FORM_ERRORS_KEYS, authFormErrorMessagesDict } from '@/components/auth/_authUtils';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast/useToast';

const FORGOT_PASSWORD = {
    EMAIL: 'email',
} as const;

export type ForgotPasswordData = {
    [FORGOT_PASSWORD.EMAIL]: string;
};

const forgotPasswordFormDict = {
    pl: {
        setNewPassword: 'Ustaw nowe hasło',
        email: 'Email',
        reset: 'Resetuj',
        login: 'Zaloguj się hasłem',
        or: 'lub',
        resetPasswordMessage:
            'Wiadomość e-mail umożliwiająca zresetowanie hasła została wysłana. Sprawdź swoją skrzynkę odbiorczą.',
        error: 'Wystąpił błąd, spróbuj ponownie później.',
    },
    en: {
        setNewPassword: 'Set new password',
        email: 'Email',
        reset: 'Reset',
        login: 'Login with password',
        or: 'or',
        resetPasswordMessage: 'An email to reset your password has been sent. Check your email inbox.',
        error: 'An error occurred, please try again later.',
    },
};

const ForgotPassword = () => {
    const { toast } = useToast();

    const locale = useLocaleContext();
    const t = forgotPasswordFormDict[locale];
    const tFormErrorMessages: Record<string, string> = authFormErrorMessagesDict[locale];

    const forgotPasswordSchema = z.object({
        [FORGOT_PASSWORD.EMAIL]: z.string().email(AUTH_FORM_ERRORS_KEYS.INCORRECT_EMAIL),
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            [FORGOT_PASSWORD.EMAIL]: '',
        },
    });

    const handleForgotPassword = async (formData: ForgotPasswordData) => {
        const error = await resetPassword(formData);

        if (error) {
            toast({ description: t.error });
            throw new Error(error);
        }
    };

    return (
        <section className="flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">{t.setNewPassword}</h1>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="flex flex-col gap-6"
            >
                {formState.isSubmitSuccessful ? (
                    <p>{t.resetPasswordMessage}</p>
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
                            placeholder="adres@mail.pl"
                            error={getFormErrorMessage(
                                formState.errors[FORGOT_PASSWORD.EMAIL]?.message,
                                tFormErrorMessages
                            )}
                            {...register(FORGOT_PASSWORD.EMAIL)}
                        />
                        <div className="flex items-baseline justify-between">
                            <Button
                                className="w-full"
                                type="submit"
                            >
                                {t.reset}
                            </Button>
                        </div>
                    </>
                )}
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <hr className="my-4" />
                <p className="font-medium">{t.or}</p>
                <hr className="my-4" />
            </div>
            <p>
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

export default ForgotPassword;
