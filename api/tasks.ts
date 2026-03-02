import {Tasks} from "@/types/task";
export const getTasks = async (): Promise<Tasks[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    status: "to-do",
                    tasks: [
                        {
                            uuid: "3sdfsd322",
                            name: "Name",
                            description: "Name"
                        },
                        {
                            uuid: "324323222",
                            name: "Name2",
                            description: "Name"
                        }
                    ]
                },
                {
                    status: "in-progress",
                    tasks: [
                        {
                            uuid: "32432322",
                            name: "Name3",
                            description: "Name"
                        },
                        {
                            uuid: "32432432",
                            name: "Name4",
                            description: "Name"
                        }
                    ]
                }
            ]);
        }, 1500);
    });
}