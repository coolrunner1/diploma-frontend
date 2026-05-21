"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/Global/ui/card';
import {Button} from '@/components/Global/ui/button';
import {Link} from "@/i18n/navigation";
import {useQueryWithErrorQueue} from "@/hooks/useQueryWithErrorQueue";
import {getProjects} from "@/api/projects";
import {NavBar} from "@/components/Global/Headers/NavBar";
import {projectNavigation} from "@/constants/navigation";
import {useTranslations} from "next-intl";
import {SomethingWentWrongText} from "@/components/Global/Misc/SomethingWentWrongText";
import {generateArrayOfUUIDs} from "@/utils/generators";

export default function Projects() {
    const t = useTranslations();

    const {data: projects, isError, isLoading} = useQueryWithErrorQueue({
        queryKey: ['projects'],
        queryFn: getProjects,
    })

    return (
        <NavBar>
            <div className="flex flex-col h-full">
                <div className="shadow-xl bg-container p-6">
                    <h1 className="text-3xl font-semibold mb-2">{t("projects")}</h1>
                    <p>{t("manage-projects")}</p>
                </div>

                {isError && <SomethingWentWrongText/>}

                <div className="flex-1 overflow-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-8xl">
                        {isLoading &&
                            generateArrayOfUUIDs(9).map((uuid) => (
                                <Card key={uuid} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className={"p-4 max-w-96 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                                        <div className={"p-3 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2">
                                            {projectNavigation.map((item, index) => {
                                                return (
                                                    <Button
                                                        key={item.name+"-projects-page"}
                                                        asChild
                                                        variant={!index ? "default" : "outline"}
                                                        className={"animate-pulse"}
                                                        size="sm"
                                                    >
                                                        <div>
                                                        </div>
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                        {!isLoading && projects?.map((project) => (
                            <Card key={project.uuid+"-projects-page"} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <CardDescription>{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2">
                                        {projectNavigation.map((item, index) => {
                                            const Icon = item.icon;
                                            return (
                                                <Button
                                                    key={item.name+"-projects-page"}
                                                    asChild
                                                    variant={!index ? "default" : "outline"}
                                                    className={"overflow-hidden"}
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={`/projects/${project.id}/${item.href}`}
                                                    >
                                                        <Icon className="w-4 h-4 mr-2"/>
                                                        {t(item.name)}
                                                    </Link>
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </NavBar>
    );
}