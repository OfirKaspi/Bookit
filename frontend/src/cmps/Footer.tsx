export const Footer = () => {
    return (
        <div className="bg-blue-800 p-4">
            <div className="flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    Bookit.com
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}