import Link from "next/link"

type ProductItem = {
    data: {
        id:number
        titulo:string
        sku:string
        estoque:number
        preco:number
    }
}

export const ProductItem:React.FC<ProductItem> = ({data}) => {

    return (
        <Link href={`/products/${data.id}`} className="flex flex-col lg:grid grid-cols-12 gap-4 rounded-lg bg-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-300">
            <span className="col-span-2 text-left"><span className="lg:hidden">Id:</span> {data.id}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Título:</span> {data.titulo}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">SKU:</span> {data.sku}</span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Estoque:</span>{data.estoque} </span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Preço:</span>{data.preco} </span>
        </Link>



    )

}