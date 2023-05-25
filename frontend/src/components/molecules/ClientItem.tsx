import Link from "next/link"

export const ClientItem = () => {

    return (
        <Link href={`/clients/${2}`} className="flex flex-col lg:grid grid-cols-12 gap-4 rounded-lg bg-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-300">
            <span className="col-span-3 text-left"><span className="lg:hidden">Id:</span> 1</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Nome:</span> Tomaz Xavier</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Email:</span> tomazcx06@gmail.com</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">CPF:</span> 092904489-46</span>
        </Link>
    )

}