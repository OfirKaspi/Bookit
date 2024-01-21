import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import { signOut } from "../services/user.service"

export const SignOutButton = () => {

    const queryClient = useQueryClient()
    const { showToast } = useAppContext()

    const mutation = useMutation(signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken')
            showToast({ message: 'Sign Out!', type: 'SUCCESS' })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }

    return (
        <button onClick={handleClick} className="rounded text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 h-[40px]">
            Sign Out
        </button>
    )
}