import { useCallback, useContext, useState } from 'react'

import { ProductContext } from 'pages-components/Products'
import { IProduct } from '../../../../../@types/Product'
import { DeleteItemModal } from '../ModalForm/DeleteItemModal'
import { EditItemModal } from '../ModalForm/EditItemModal'
import { TableLayout } from './layout'

export function TableList() {
  const { products, isLoading, setPage, page, customersTotal, totalPages } =
    useContext(ProductContext)
  const [id, setId] = useState('')
  const [items, setItems] = useState({} as IProduct)
  const [isDeleteItemModal, setIsDeleteItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  function handleCloseModal() {
    setIsDeleteItemModalOpen(false)
    setIsEditModalOpen(false)
  }

  const handleOpenEditModal = useCallback((items: IProduct) => {
    setItems(items)
    setIsEditModalOpen(true)
  }, [])

  const handleOpenDeleteItemModal = useCallback((itemId: string) => {
    setId(itemId)
    setIsDeleteItemModalOpen(true)
  }, [])

  function handleNextPage() {
    setPage((prev) => (prev === totalPages ? prev : prev + 1))
  }

  function handlePrevPage() {
    setPage((prev) => (prev === 1 ? 1 : prev - 1))
  }

  return (
    <>
      <TableLayout
        isLoading={isLoading}
        items={products}
        onOpenDelete={handleOpenDeleteItemModal}
        onOpenEdit={handleOpenEditModal}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        itemsTotal={customersTotal}
        pageTotal={totalPages}
        pageAtual={page}
      />

      <DeleteItemModal
        id={id}
        isOpen={isDeleteItemModal}
        onClose={handleCloseModal}
      />

      <EditItemModal
        items={items}
        isEditModalOpen={isEditModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
