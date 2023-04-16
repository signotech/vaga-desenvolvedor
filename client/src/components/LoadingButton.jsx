import { useState } from "react";
import Spinner from "./Spinner";
import Icon from "./Icon";

export default function LoadingButton(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleClick() {
        try {
            setIsLoading(true);
            await props.handler();
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000)
        } catch(error) {
            console.log(error);
        }
    }

    function renderButton() {
        if(isLoading) {
            return (
                <button className="col s12 m6 btn loading-btn blue-grey lighten-5 waves-light" type="submit">
                    <Spinner />
                </button>
            )
        } else if(isSuccess){
            return (
                <button className="col s12 m6 btn green darken-1 lighten-5 waves-light" type="submit">
                    <Icon>check</Icon>
                    <span>Sucesso</span>
                </button>
            )
        } else {
            return (
                <button 
                    className="col s12 m6 btn blue darken-1 waves-light" 
                    type="submit"
                    onClick={handleClick}
                > 
                    { props.children }
                </button>
            )
        }
    }

    return (
        renderButton()
    )
}