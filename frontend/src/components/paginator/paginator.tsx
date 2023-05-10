import React from "react"

interface PaginatorProps {
    PageUrl: string
    pages?: any
}

export default function Paginator(props: PaginatorProps) {

    function getNecessariesPages(pages: number) {
        const paginationNumber: number[] = []
        for (let i: number = 1; i <= pages; i++) paginationNumber.push(i)

        return paginationNumber
    }

    function renderPaginationList() {
        const pageItem = getNecessariesPages(props.pages)

        return pageItem.map((pageNumber: number, index: number) => {
            if (pageItem.length > 1) {
                return (
                    <li key={`pagination-button-${index}`}>
                        <a href={`${props.PageUrl}&page=${pageNumber}`}>{pageNumber}</a>
                    </li>
                )
            }
        })
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <ul className="pagination">
                {renderPaginationList()}
            </ul>
        </div>
    )
}