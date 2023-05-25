'use client'
import { SignUpForm } from "@components/organisms/SignUpForm"
import { store } from "@store/store"
import { Provider } from "react-redux"

const SignUp = () => {

    return (
        <Provider store={store}>
            <main className="flex flex-col items-center justify-center bg-sign-up bg-cover bg-no-repeat  h-screen">
                <SignUpForm />
            </main>
        </Provider>
    )

}

export default SignUp