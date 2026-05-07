"use client"
import {CardContent, CardHeader, CardTitle} from '@/components/Global/FigmaTempVibe/card';
import {Button} from "@/components/Global/FigmaTempVibe/button";
import {Label} from "@/components/Global/FigmaTempVibe/label";
import {Input} from "@/components/Global/FigmaTempVibe/input";
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import {AuthFormContainer} from "@/components/Auth/AuthFormContainer";
import {SubmitEvent} from "react";

export default function Login() {
    const t = useTranslations("Auth");
    const handleSubmit = (e: SubmitEvent<HTMLFormElement> ) => {
        e.preventDefault();
        // Handle login logic here
        window.location.href = '/app';
    };

    return (
        <AuthFormContainer>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">{t('sing-in-continue')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t('username-or-email')}</Label>
                        <Input
                            id="username-or-email"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">{t('password')}</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        {t('sign-in')}
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    {t('no-account')}{' '}
                    <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                        {t('sign-up-now')}
                    </Link>
                </div>
            </CardContent>
        </AuthFormContainer>
    );
}
