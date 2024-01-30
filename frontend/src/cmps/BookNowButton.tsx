import { useAppContext } from "../contexts/AppContext"

type Props = {
    onSubmit: () => void
}

export const BookNowButton = ({ onSubmit }: Props) => {

    const { isLoggedIn } = useAppContext()

    return (
        <button onClick={onSubmit} className="rounded bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
            {isLoggedIn ? 'Book Now' : 'Sign in to Book'}
        </button>
    )

}