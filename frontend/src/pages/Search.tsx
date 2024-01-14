import { useSearchContext } from "../contexts/SearchContext"

export const Search = () => {
    const search = useSearchContext()
    console.log(search)

    return (
        <>Search Page</>
    )
}