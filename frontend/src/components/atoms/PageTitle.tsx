type PageTitle = {
    text: string
}

export const PageTitle: React.FC<PageTitle> = ({ text }) => {

    return (
        <h1 className=" text-xl lg:text-2xl text-left w-full">{text}</h1>
    )

}