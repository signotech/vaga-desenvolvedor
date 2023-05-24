type TitleForm = {
    text:string
}

export const TitleForm:React.FC<TitleForm> = ({text}) => {

    return (
       <h1 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-4">{text}</h1>

    )

}