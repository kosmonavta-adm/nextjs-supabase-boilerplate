'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLocaleContext } from '@/commons/providers/LocaleProvider';
import { getFormErrorMessage, url } from '@/commons/utils';
import { updatePassword } from '@/components/auth/_authActions';
import { AUTH_FORM_ERRORS_KEYS, authFormErrorMessagesDict } from '@/components/auth/_authUtils';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const UPDATE_PASSWORD = {
    NEW_PASSWORD: 'newPassword',
    CONFIRM_NEW_PASSWORD: 'confirmNewPassword',
} as const;

const updatePasswordSchema = z
    .object({
        [UPDATE_PASSWORD.NEW_PASSWORD]: z.string().min(6, AUTH_FORM_ERRORS_KEYS.PASSWORD_MIN_LENGTH),
        [UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD]: z.string().min(6, AUTH_FORM_ERRORS_KEYS.PASSWORD_MIN_LENGTH),
    })
    .refine(
        (values) => {
            return values[UPDATE_PASSWORD.NEW_PASSWORD] === values[UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD];
        },
        {
            message: AUTH_FORM_ERRORS_KEYS.PASSWORDS_DOESNT_MATCH,
            path: [UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD],
        }
    );

const updatePasswordFormDict = {
    pl: {
        setNewPassword: 'Ustaw nowe hasło',
        password: 'Hasło',
        changePassword: 'Zmień hasło',
        confirmPassword: 'Potwierdź hasło',
        error: 'Wystąpił błąd, spróbuj ponownie później.',
    },
    en: {
        setNewPassword: 'Set new password',
        password: 'Hasło',
        changePassword: 'Change password',
        confirmPassword: 'Confirm password',
        error: 'An error occurred, please try again later.',
    },
};

export type UpdateasswordData = z.infer<typeof updatePasswordSchema>;

const UpdatePassword = () => {
    const router = useRouter();
    const locale = useLocaleContext();

    const t = updatePasswordFormDict[locale];
    const tFormErrorMessages: Record<string, string> = authFormErrorMessagesDict[locale];

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            [UPDATE_PASSWORD.NEW_PASSWORD]: '',
            [UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD]: '',
        },
    });

    const handleUpdatePassword = async (formData: UpdateasswordData) => {
        const error = await updatePassword(formData);

        if (error === null) router.replace(url.dashboard);
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">{t.setNewPassword}</h1>
            <form
                onSubmit={handleSubmit(handleUpdatePassword)}
                className="flex flex-col gap-6"
            >
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
                        formState.errors[UPDATE_PASSWORD.NEW_PASSWORD]?.message,
                        tFormErrorMessages
                    )}
                    {...register(UPDATE_PASSWORD.NEW_PASSWORD)}
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
                        formState.errors[UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD]?.message,
                        tFormErrorMessages
                    )}
                    {...register(UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD)}
                />

                <Button type="submit">{t.changePassword}</Button>
            </form>
        </section>
    );
};

export default UpdatePassword;
