import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { PageTitle } from "@components/atoms/PageTitle"
import { PaginationInput } from "@components/atoms/PaginationInput"
import { SearchInput } from "@components/atoms/SearchInput"
import { CreateProductDialog } from "@components/molecules/CreateProductDialog"
import { DeleteAllAlert } from "@components/molecules/DeleteAllAlert"
import { ProductItem } from "@components/molecules/ProductItem"
import { api } from "@utils/api"
import { CaretLeft, CaretRight } from "phosphor-react"
import { useCallback, useEffect, useState } from "react"

type Product = {
    id: number
    titulo: string
    estoque: number
    preco: number
    sku: string
}

type Page = {
    id: number
}

export const MainProducts = () => {


    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(1)
    const [pagesArray, setPagesArray] = useState<Page[]>([])
    const [quantity, setQuantity] = useState(20)
    const [nameFilter, setNameFilter] = useState('')

    const getAllProducts = async () => {
        const response = await api.get(`/product?take=${100}&skip=${0}`)
        const numberOfPages = Math.ceil(response.data.length / quantity)
        let newArrayOfPages = []
        for (let i = 0; i < numberOfPages; i++) {
            newArrayOfPages.push({ id: i + 1 })
        }
        setPagesArray(newArrayOfPages)
    }


    const getProductsWithPagination = useCallback(async () => {
        const numToSkip = (page - 1) * quantity
        const response = await api.get(`/product?take=${quantity}&skip=${numToSkip}`)
        setProducts(response.data)
    }, [page, quantity])

    useEffect(() => {
        getAllProducts()
    })

    useEffect(() => {
        getProductsWithPagination()
    }, [page, quantity, getProductsWithPagination])

    const nextPage = () => {
        if (page + 1 <= pagesArray.length) {
            setPage(prevState => prevState + 1)
        }

    }

    const previousPage = () => {
        if (page - 1 >= 1) {
            setPage(prevState => prevState - 1)
        }

    }

    const productsArray = nameFilter !== "" ? products.filter(product => product.titulo.toLowerCase().includes(nameFilter.toLowerCase()) || product.sku.toLowerCase().includes(nameFilter.toLowerCase())) : []

    return (
        <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-12">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
                <PageTitle text="Produtos" />
                <div className="flex gap-4 w-[600px] max-w-full">
                    <DeleteAllAlert endpointApi="/product" refetch={getProductsWithPagination} button={<Button text="Deletar todos" buttonType={BUTTON_TYPE.RED} />} entityToDelete="produtos" />
                    <CreateProductDialog refetch={getProductsWithPagination} />
                </div>
            </div>
            <div className="w-full flex lg:flex-row flex-col gap-4">
                <SearchInput placeholder="Pesquisar por título ou SKU..." onChange={e => setNameFilter(e.target.value)} />
                <PaginationInput setQuantityFun={setQuantity} setPage={setPage} />
            </div>
            <span>Clique no produto para editar ou deletar.</span>
            <div className="flex-col gap-8">
                <div className="hidden lg:grid grid-cols-12 gap-4 p-2">
                    <span className="col-span-2">Id</span>
                    <span className="col-span-3">Título</span>
                    <span className="col-span-3">SKU</span>
                    <span className="col-span-2">Estoque</span>
                    <span className="col-span-2">Preço</span>
                </div>

                <div className="flex flex-col gap-2">
                    {nameFilter !== '' ? productsArray.map(product => <ProductItem key={product.id} data={product} />) : products.map(product => <ProductItem key={product.id} data={product} />)}

                </div>
                <div className="w-full flex items-center justify-center gap-4 mt-12">
                    <CaretLeft size={18} className="text-blue-400 hover:text-blue-500 cursor-pointer transition-colors" onClick={() => previousPage()} />
                    {pagesArray.map(pageToRender => (
                        <span key={pageToRender.id} onClick={() => setPage(pageToRender.id)} className={`${page === pageToRender.id && "text-blue-500"} hover:text-blue-500 cursor-pointer transition-colors`}>{pageToRender.id}</span>

                    ))}
                    <CaretRight size={18} className="text-blue-400 cursor-pointer hover:text-blue-500 transition-colors" onClick={() => nextPage()} />


                </div>
            </div>
        </section>

    )

}