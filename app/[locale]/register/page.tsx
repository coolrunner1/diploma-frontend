"use client"
import {Button} from '@/components/Global/FigmaTempVibe/button';
import {Input} from '@/components/Global/FigmaTempVibe/input';
import {Label} from '@/components/Global/FigmaTempVibe/label';
import {CardContent, CardDescription, CardHeader, CardTitle} from '@/components/Global/FigmaTempVibe/card';
import {Checkbox} from '@/components/Global/FigmaTempVibe/checkbox';
import {SubmitEvent, useState} from 'react';
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import {AuthFormContainer} from "@/components/Auth/AuthFormContainer";

export default function Register() {
    const t = useTranslations("Auth");
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!agreed) {
            alert('Please agree to the terms and conditions');
            return;
        }
        // Handle registration logic here
        window.location.href = '/app';
    };

    return (
        <AuthFormContainer>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">{t('create-account')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('username')}</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
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
                        <p className="text-xs text-gray-500">
                            Must be at least 8 characters long
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">{t('confirm-password')}</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        {t('sign-up')}
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    {t('have-account')}{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        {t('login-now')}
                    </Link>
                </div>
            </CardContent>
        </AuthFormContainer>
    );
}
