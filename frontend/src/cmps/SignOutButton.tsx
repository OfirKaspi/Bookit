import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import { signOut } from "../services/user.service"
import { useNavigate } from "react-router"

type Props = {
    isSmallScreen: boolean
}

export const SignOutButton = ({ isSmallScreen }: Props) => {

    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const navigate = useNavigate()

    const mutation = useMutation(signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken')
            showToast({ message: 'Sign Out!', type: 'SUCCESS' })
            navigate('/')
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }

    const bigScreenStyling = 'lg:w-fit lg:bg-white lg:font-medium lg:px-2 lg:py-1 lg:transition-all lg:hover:bg-gray-100 lg:hover:text-blue-900 lg:inline-block'
    const smallScreenStyling = 'w-full flex justify-start hover:bg-gray-100'

    return (
        <button onClick={handleClick} className={`${isSmallScreen ? smallScreenStyling : bigScreenStyling} text-blue-600 rounded p-2 `}>
            Sign out
        </button>
    )
}