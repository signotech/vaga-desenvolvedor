import Link from "next/link"

type PurchasedProduct = {
    id:number
    titulo:string
    sku:string
    preco:number
    quantidade:number
}

export const PurchasedProduct:React.FC<PurchasedProduct> = ({id, titulo, preco, sku, quantidade}) => {

    return (
        <Link href={`/products/${2}`} className="flex flex-col lg:grid grid-cols-12 gap-4 rounded-lg bg-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-300">
            <span className="col-span-2 text-left"><span className="lg:hidden">Id:</span> {id}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Título:</span>{titulo}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">SKU:</span> {sku}</span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Preço unitário:</span>{preco} </span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Quantidade:</span>{quantidade}</span>
        </Link>



    )

}
