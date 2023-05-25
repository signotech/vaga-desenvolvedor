import { useRouter } from "next/navigation"
import { useAppSelector } from "../../hooks/useAppSelector"
import { JSXElementConstructor, ReactElement, useCallback, useEffect, useState } from "react"
import { api } from "@utils/api"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setSignOut } from "@store/user/user-reducer"

type RouteGuard = {
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}

export const RouteGuard = ({ children }: RouteGuard) => {

    const router = useRouter()
    const { token, authenticated } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [authorized, setIsAuthorized] = useState(false)

    const validateToken = useCallback(async () => {
        try {
            await api.post("/auth/validate", { token })
            setIsAuthorized(true)
            api.defaults.headers.common["Authorization"] = `Bearer: ${token}`
        } catch (err) {
            dispatch(setSignOut())
            router.push("/sign-in")
        }
    }, [router, token, dispatch])

    useEffect(() => {
        if (!authenticated || !token) {
            setIsAuthorized(false)
            router.push("/sign-in")
            return
        }
        validateToken()
        
    }, [token, authenticated, validateToken, router])


    return authorized ? (
        children
    ) : <h1 className="text-black text-center text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Carregando...</h1>



}