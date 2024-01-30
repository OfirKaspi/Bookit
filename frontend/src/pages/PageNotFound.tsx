import { Link } from "react-router-dom"

export const PageNotFound = () => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-bold text-3xl">Page Not Found...</h3>
            <Link to={'/'} className="rounded bg-blue-600 text-white w-fit p-2 font-bold hover:bg-blue-500 text-xl">Go back home</Link>
        </div>
    )
} 