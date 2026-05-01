export const PlaceholderKanbanColumn = () => {
    return (
            <div
                className="flex flex-col w-80 bg-container rounded-lg border border-default-border"
            >
                <div className={`px-4 py-3 border-b border-default-border rounded-t-lg`}>
                    <div className="flex items-center justify-between">
                        <div className={`p-4 w-full bg-gray-300 dark:bg-gray-700 animate-pulse`}>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                    {[1,2,3,4].map((el, index) => (
                        <div
                            key={el}
                            className="border bg-background border-default-border rounded-lg p-3 flex flex-col gap-2 hover:shadow-md transition-shadow group"
                        >
                            {[1,2,3].map((el, index) => (
                                <div key={index} className={`p-4 bg-gray-300 dark:bg-gray-700 animate-pulse`}>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
    )
}