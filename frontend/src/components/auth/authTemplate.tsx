import React, { useEffect } from "react";

import SignIn from "./signIn";
import SignUp from "./signUp";

interface AuthTemplateProps {
    operation: string
    setOperation: any
}

export default function AuthTemplate(props: AuthTemplateProps) {

    useEffect(() => localStorage.removeItem("user_info"), [])

    const renderAuthTemplate = () => {
        if (props.operation === "signIn") return <SignIn />
        else if (props.operation === "signUp") return <SignUp />
    }

    return (
        <div className="sign-container">
            <div className="sign-box">
                {renderAuthTemplate()}
            </div>
        </div>
    )
}