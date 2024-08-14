'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLocaleContext } from '@/commons/providers/LocaleProvider';
import { url } from '@/commons/utils';
import { loginUser } from '@/components/auth/_authActions';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast/useToast';

const LOGIN = {
    EMAIL: 'email',
    PASSWORD: 'password',
} as const;

const loginSchema = z.object({
    [LOGIN.EMAIL]: z.string().email('Email is incorrect'),
    [LOGIN.PASSWORD]: z.string(),
});

export type LoginData = z.infer<typeof loginSchema>;

const loginFormDict = {
    pl: {
        loginPanel: 'Panel logowania',
        login: 'Zaloguj się',
        email: 'Email',
        or: 'lub',
        password: 'Hasło',
        forgotPassword: 'Zapomniałeś hasła?',
        createAccount: 'Załóż konto!',
    },
    en: {
        loginPanel: 'Login Panel',
        login: 'Login',
        email: 'Email',
        or: 'or',
        password: 'Password',
        forgotPassword: 'Forgot password?',
        createAccount: 'Create an account!',
    },
};

const LoginForm = () => {
    const { toast } = useToast();
    const router = useRouter();

    const locale = useLocaleContext();
    const t = loginFormDict[locale];

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            [LOGIN.EMAIL]: '',
            [LOGIN.PASSWORD]: '',
        },
    });

    const handleLogin = async (formData: LoginData) => {
        const error = await loginUser(formData);

        if (error === null) router.replace(url.dashboard);
        else toast({ description: 'Email or password are incorrect' });
    };

    return (
        <section className="flex w-full max-w-md flex-col gap-6">
            <h1 className="mb-4 text-xl font-bold">{t.loginPanel}</h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-6"
            >
                <Input
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.email}
                            </>
                        ),
                    }}
                    error={formState.errors[LOGIN.EMAIL]?.message}
                    placeholder="example@mail.com"
                    {...register(LOGIN.EMAIL)}
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
                    {...register(LOGIN.PASSWORD)}
                />
                <div className="flex items-baseline justify-between">
                    <CustomLink
                        href={url.forgotPassword}
                        className=""
                    >
                        {t.forgotPassword}
                    </CustomLink>
                    <Button type="submit">{t.login}</Button>
                </div>
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <hr className="my-4" />
                <p className="font-medium">{t.or}</p>
                <hr className="my-4" />
            </div>
            <p>
                <CustomLink
                    className="font-bold text-green-400 hover:text-green-600"
                    href={url.register}
                >
                    {t.createAccount}
                </CustomLink>
            </p>
        </section>
    );
};

export default LoginForm;
