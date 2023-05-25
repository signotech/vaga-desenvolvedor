import Link from "next/link"

export const ProductItem = () => {

    return (
        <Link href={`/products/${2}`} className="flex flex-col lg:grid grid-cols-12 gap-4 rounded-lg bg-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-300">
            <span className="col-span-2 text-left"><span className="lg:hidden">Id:</span> 1</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Título:</span> Carne moída</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">SKU:</span> SKU81291239</span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Estoque:</span>30 </span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Preço:</span>10.99 </span>
        </Link>



    )

}