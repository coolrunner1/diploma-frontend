import {Status} from "@/types/task";
import { v4 as uuidv4 } from 'uuid';

export const getStatuses = async (): Promise<Status[]> => {
    return new Promise((resolve, reject) => {
        let statuses = localStorage.getItem("statuses");
        if (!statuses) {
            statuses = JSON.stringify([
                {
                    uuid: uuidv4(),
                    name: "to-do",
                },
                {
                    uuid: uuidv4(),
                    name: "in-progress",
                }
            ]);
            localStorage.setItem("statuses", JSON.stringify(statuses));
        }
        setTimeout(() => {
            resolve(JSON.parse(JSON.parse(statuses)));
        }, 1500);
    });
}