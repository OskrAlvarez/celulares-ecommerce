import type { Color, Product, VariantProduct } from "../interfaces"

// Funcion para preparar los productos
export function preparedProducts(products:Product[]) {
  return products.map(product => {
    // Agrupar las variantes por color
    const colors = product.variants.reduce((acc: Color[], variant: VariantProduct) => {
      const existingColor = acc.find(item => item.color === variant.color)

      if (existingColor) {
        // Si existe el color, comparamos precios
        existingColor.price = Math.min(existingColor.price, variant.price)

      } else {
        acc.push({
          color: variant.color,
          price: variant.price,
          name: variant.color_name
        })
      }
      return acc
    }, [])

    // Obtener el precio mas bajo de las variantes agrupadas
    const price = Math.min(...colors.map(item => item.price))

    // Devolver el producto formateado
    return {
      ...product,
      price,
      colors: colors.map(({name, color}) => ({ name, color })),
      variants: product.variants
    }
  })
}

// Funcion para formatear precio a dolares
export function formatPrice(price:number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

// Funcion para formatear fecha a 3 de enero de 2022
export function formatDateLong(date: string): string {
  const dateObject = new Date(date)

  return dateObject.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Funcion para formatear la fecha a 03/01/2022
export function formatDateShort(date: string): string {
  const dateObject = new Date(date)

  return dateObject.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// Funcion para obtener estado de pedido en español
export function getStatus(status:string): string {
  switch (status) {
    case 'Pending':
      return 'Pendiente'

    case 'Paid':
      return 'Pagado'

      case 'Shipped':
      return 'Enviado'

    case 'Delivered':
      return 'Entregado'

    default:
      return status
  }
}

export function getInitials (fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map(p => p.charAt(0).toUpperCase());
  return initials.join('');
};
