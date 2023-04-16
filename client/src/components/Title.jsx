import PrevPage from "./PrevPage";

export default function Title(props) {
    return (
        <p className={`title ${props.canGoBack? 'can-go-back' : ''}`}>
            { props.canGoBack && <PrevPage /> }    
            <span>{ props.children }</span>
        </p>
    )
}