import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import { signOut } from "../services/user.service"
import { useNavigate } from "react-router"
import { IoExitOutline } from "react-icons/io5"

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

    const bigScreenStyling = 'w-fit bg-white font-medium px-2 py-1 hover:bg-gray-100 hover:text-blue-900 inline-block text-blue-600'
    const smallScreenStyling = 'w-full flex justify-start hover:bg-gray-100 flex items-center'

    return (
        <button onClick={handleClick} className={`${isSmallScreen ? smallScreenStyling : bigScreenStyling} transition-all rounded p-2`}>
            {/* {isSmallScreen && <IoExitOutline className="h-5 w-5" />} */}
            {isSmallScreen && <IoExitOutline size={25} className="mr-2" />}
            <span>Sign out</span>
        </button>
    )
}