import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/Global/ui/card";
import {ResponsiveContainer} from "recharts";
import {generateArrayOfUUIDs} from "@/utils/generators";
import {Progress} from "@/components/Global/ui/progress";

export const StatsLoading = () => {
    return (
        <>
            <div>
                <div className="py-3 max-w-96 bg-container animate-pulse"></div>
                <div className="py-2 mt-1 max-w-96 bg-container animate-pulse"></div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {generateArrayOfUUIDs(4).map((uuid) => (
                    <Card key={uuid} className="animate-pulse">
                        <CardHeader>
                            <CardDescription className={"text-container"}>T</CardDescription>
                            <CardTitle className={"text-container"}>F</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={0} className={"text-container"}/>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
                {generateArrayOfUUIDs(4).map((uuid) => (
                    <Card key={uuid} className="animate-pulse">
                        <CardHeader>
                            <CardDescription className={"text-container"}>T</CardDescription>
                            <CardTitle className={"text-container"}>F</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <></>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className={"animate-pulse"}>
                <CardHeader>
                    <CardDescription className={"text-container"}>T</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 py-52">
                    <></>
                </CardContent>
            </Card>
        </>
    )
}