import { useGlobalStore } from "@/common/store/global.store"
import { Cart } from "@/features/cart"
import { Search } from "@/features/products"
import { useEffect, useRef } from "react"

export function Sheet() {
  const sheetContent = useGlobalStore((state) => state.sheetContent)
  const closeSheet = useGlobalStore((state) => state.closeSheet)

  const sheetRef = useRef<HTMLDivElement | null>(null)

  // Funcionalidad para cerrar el sheet al hacer click fuera de el
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    // Funcion para manejar click fuera del sheet
    const handleOutsideClick = (e: MouseEvent) => {
      if(sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        closeSheet()
      }
    }

    // Agregar event listener
    document.addEventListener('mousedown', handleOutsideClick)

    // Clean up
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [closeSheet])

  // Funcion para saber que componente renderizar
  const renderContent = () => {
    switch (sheetContent) {
      case 'CART':
        return <Cart />
      case 'SEARCH':
        return <Search />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end animate-fade-in">
      <div ref={sheetRef} className="bg-white text-black h-screen w-[350px] shadow-lg animate-slide-in">
        {renderContent()}
      </div>
    </div>
  )
}
