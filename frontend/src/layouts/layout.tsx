import { Header } from "../cmps/Header"
import { Hero } from "../cmps/Hero"
import { Footer } from "../cmps/Footer"
import { SearchBar } from "../cmps/SerachBar"

interface Props {
    children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
    return <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <div className="container mx-auto p-4">
            <SearchBar />
        </div>
        <div className="container mx-auto py-10 flex-1 p-4">
            {children}
        </div>
        <Footer />
    </div>
}