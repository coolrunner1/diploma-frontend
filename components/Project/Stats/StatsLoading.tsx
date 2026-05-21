import {Card, CardContent, CardHeader} from "@/components/Global/ui/card";
import {ResponsiveContainer} from "recharts";
import {generateArrayOfUUIDs} from "@/utils/generators";
import {Progress} from "@/components/Global/ui/progress";

export const StatsLoading = () => {
    return (
        <>
            <div>
                <div className="py-3 max-w-96 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                <div className="py-2 mt-1 max-w-96 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {generateArrayOfUUIDs(4).map((uuid) => (
                    <Card key={uuid}>
                        <CardHeader>
                            <div className={"p-3 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                            <div className={"p-4 max-w-24 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                        </CardHeader>
                        <CardContent>
                            <Progress value={0} className={"text-container"}/>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
                {generateArrayOfUUIDs(4).map((uuid) => (
                    <Card key={uuid}>
                        <CardHeader>
                            <div className={"p-4 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                            <div className={"p-3 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}
                                                 className={"bg-gray-300 dark:bg-gray-700 animate-pulse"}>
                                <></>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <div className={"p-4 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {generateArrayOfUUIDs(4).map((uuid) => (
                        <div key={uuid} className={"p-10 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}