import { RouteGuard } from "@components/organisms/RouteGuard"
import { Header } from "../molecules/Header"
import { Sidebar } from "../molecules/Sidebar"
import { Provider } from "react-redux"
import { store } from "@store/store"

type DashboardLayout = {
    children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayout> = ({ children }) => {

    return (
        <Provider store={store}>
            <RouteGuard>
                <>
                    <Header />
                    <main className='lg:grid lg:grid-cols-12 text-gray-800'>
                        <Sidebar />
                        {children}
                    </main>

                </>
            </RouteGuard>
        </Provider>
    )

}