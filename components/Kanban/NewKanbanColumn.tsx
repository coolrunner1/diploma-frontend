import {useTranslations} from "next-intl";
import {useState} from "react";

export type NewKanbanColumnProps = {

}

export const NewKanbanColumn = (props: NewKanbanColumnProps) => {
    const t = useTranslations();
    const [modal, setModal] = useState(false);

    return (
        <>
            {modal && (
                <>
                    modal
                </>
            )}
            <div
                className="w-80 flex align-center justify-center bg-container rounded-lg border border-dashed border-default-border"
                onClick={() => setModal(true)}
            >
                <span
                    className={"font-light select-none m-auto text-lg"}
                >
                    {t('create-new-status')}
                </span>
            </div>
        </>
    )
}