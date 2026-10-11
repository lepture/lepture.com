export interface PaginationPage<Item> {
  items: Item[]
  currentPage: number
  totalItems: number
  totalPages: number
}

export function createPaginationPage<Item>(
  items: Item[],
  currentPage: number,
  pageSize: number,
): PaginationPage<Item> {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new Error('Pagination page size must be a positive integer.')
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  if (
    !Number.isInteger(currentPage) ||
    currentPage < 1 ||
    currentPage > totalPages
  ) {
    throw new Error(
      `Pagination page must be between 1 and ${totalPages}; received ${currentPage}.`,
    )
  }

  const start = (currentPage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalItems: items.length,
    totalPages,
  }
}
