import React from "react"
import { Pagination } from "react-bootstrap"

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  )
}

export default CustomPagination
