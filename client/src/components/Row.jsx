export default function Row(props) {
    return(
        <div className={`row ${props.className || ''}`}>
            { props.children }
        </div>
    )
}