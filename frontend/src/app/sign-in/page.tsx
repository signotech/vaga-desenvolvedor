'use client'
import { SignInForm } from "@components/organisms/SignInForm"
import { store } from '@store/store'
import { Provider } from 'react-redux'

const SignIn = () => {

    return (
        <Provider store={store}>
            <main className="flex flex-col items-center justify-center bg-sign-in bg-contain  h-screen">
                <SignInForm />
            </main>
        </Provider>



    )

}

export default SignIn