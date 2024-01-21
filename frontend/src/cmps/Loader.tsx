import { Oval } from 'react-loader-spinner'

export const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <Oval color="#003b95" secondaryColor="#003b95" visible={true} />
        </div>
    )
}