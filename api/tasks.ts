export const getTasks = async (): any => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    status: "to-do",
                    tasks: [
                        { name: "Name", description: "Name" },
                        { name: "Name", description: "Name" }
                    ]
                },
                {
                    status: "in-progress",
                    tasks: [
                        { name: "Name", description: "Name" },
                        { name: "Name", description: "Name" }
                    ]
                }
            ]);
        }, 1000);
    });
}