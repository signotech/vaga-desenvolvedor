import { useRouter } from "next/navigation"
import { useAppSelector } from "../../hooks/useAppSelector"
import { JSXElementConstructor, ReactElement, useCallback, useEffect, useState } from "react"
import { api } from "@utils/api"

type RouteGuard = {
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}

export const RouteGuard = ({ children }: RouteGuard) => {

    const router = useRouter()
    const { token, authenticated } = useAppSelector(state => state.user)

    if(!token || !authenticated){
        router.push('/sign-in')
		api.defaults.headers.common["Authorization"] = null
        return null
    }

    api.defaults.headers.common["Authorization"] = `Bearer: ${token}`


    return <>{children}</>



}