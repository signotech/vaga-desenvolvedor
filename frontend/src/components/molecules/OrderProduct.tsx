type OrderProduct = {
    id:number
    quantidade:number
    remover: (id:number) => void
}

export const OrderProduct:React.FC<OrderProduct> = ({id, quantidade, remover}) => {

    return (
        <div className="grid grid-cols-3 rounded-lg p-2 bg-gray-200">
            <span>{id}</span>
            <span>{quantidade}</span>
            <span onClick={() => remover(id)} className="text-red-400 hover:text-red-500 text-center cursor-pointer">Remover</span>
        </div>
    )

}