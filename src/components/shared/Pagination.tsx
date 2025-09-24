interface Props {
  totalItems: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({ totalItems, page, setPage }: Props) {

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1))
  }

  const itemsPerPage = 10;
  const totalPages = totalItems
  ? Math.ceil(totalItems / itemsPerPage)
  : 1;
  const isLastPage = page >= totalPages
  const startItem = (page - 1) * itemsPerPage + 1; // 1 - 11 - 21
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems); // 10 - 20 - 30
  return (
    <div className="flex justify-between items-center">
      <p className="text-xs">
        Mostrando <span className="font-bold">{startItem} - {endItem}</span> {' '}
        de <span className="font-bold">{totalItems}</span> Productos
      </p>

      <div className="flex gap-3">
        <button
          className="btn-paginated"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className="btn-paginated"
          onClick={handleNextPage}
          disabled={isLastPage}
        >Siguiente</button>
      </div>
    </div>
  )
}
