import {useTranslations} from "next-intl";

export const SomethingWentWrongText = () => {
    const t = useTranslations("Errors");

    return (
        <div className="flex items-center justify-center h-full w-full">
            <p className="text-gray-500">{t('something-wrong')}</p>
        </div>
    )
}