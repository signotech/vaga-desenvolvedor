import { Header } from "../molecules/Header"
import { Sidebar } from "../molecules/Sidebar"

type DashboardLayout = {
    children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayout> = ({ children }) => {

    return (
        <>
            <Header />
            <main className='lg:grid lg:grid-cols-12 text-gray-800'>
                <Sidebar />
                {children}
            </main>
        </>
    )

}