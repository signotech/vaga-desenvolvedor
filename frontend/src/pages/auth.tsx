import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthTemplate from "../components/auth/authTemplate";

import Layout from "../components/template/layout/layout";

export default function Auth() {
    const [mode, setMode] = useState<string>("")
    const { operation } = useParams()

    useEffect(() => {
        if (operation) setMode(operation)
        localStorage.removeItem("user_logged")
    }, [mode])

    return (
        <>
            <Layout>
                <AuthTemplate operation={mode} setOperation={setMode} />
            </Layout>
        </>
    )
}