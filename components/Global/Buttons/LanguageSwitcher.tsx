import {Link} from "@/i18n/navigation";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {LucideLanguages} from "lucide-react";
import {HeaderButtonContainer, HeaderButtonProps} from "./HeaderButtonContainer";

const languages = [
    {
        locale: 'en',
        label: 'English',
    },
    {
        locale: 'ru',
        label: 'Русский',
    }
]

export const LanguageSwitcher = (props: HeaderButtonProps) => {
    const t = useTranslations();

    const pathname = usePathname();
    const href = pathname.slice(3)

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="block relative">
            <HeaderButtonContainer
                type={props.type}
                onClick={() => setIsOpen(!isOpen)}
            >
                <LucideLanguages/>
            </HeaderButtonContainer>
            {isOpen && (
                <div
                    className="flex flex-col absolute bg-container shadow-lg w-24 rounded-md"
                    role="menu"
                    aria-orientation="vertical"
                >
                    {
                        languages.map((language) =>
                            <Link
                                key={language.locale}
                                className="hover:bg-hover w-full"
                                href={href}
                                locale={language.locale}
                            >
                                {language.label}
                            </Link>
                        )
                    }
                </div>
            )}
        </div>
    );
};
