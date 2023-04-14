import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
    return (
        <>
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
        </>
    )
}