import Link from "next/link";

export const LogoButton = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                PM
            </div>
            <span className="font-bold text-xl">ProjectHub</span>
        </Link>
    )
}