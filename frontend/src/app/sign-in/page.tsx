'use client'
import { SignInForm } from "@components/organisms/SignInForm"

const SignIn = () => {

    return (
        <main className="flex flex-col items-center justify-center bg-sign-in bg-contain  h-screen">
            <SignInForm />
        </main>
    )

}

export default SignIn