# Celulares Ecommerce

Celulares Ecommerce es una aplicación web desarrollada con React, TypeScript y Vite, orientada a la venta y exploración de smartphones. El proyecto está diseñado para ser rápido, moderno y fácil de mantener.

## Instalación y ejecución

Antes de ejecutar el proyecto, revisa el archivo `.env.example` para ver cómo debes configurar las variables de entorno necesarias. Renómbralo a `.env` y completa los valores según tu entorno.

```bash
  npm install
  npm run dev
```



## Tecnologías y librerías utilizadas
  - **React**: Biblioteca principal para la construcción de interfaces de usuario.
  - **TypeScript**: Tipado estático para mayor robustez y mantenibilidad.
  - **Vite**: Herramienta de desarrollo y bundler para aplicaciones modernas.
  - **Supabase**: Backend como servicio para autenticación y base de datos.
  - **ESLint**: Linter para mantener la calidad y consistencia del código.
  - **React Router**: Navegación entre páginas.
  - **Otras librerías**: Posibles utilidades para manejo de estado, hooks personalizados y componentes reutilizables.

## Funcionalidades principales
  - Autenticación de usuarios (registro, inicio de sesión y cierre de sesión).
  - Gestión y visualización de pedidos del usuario (OrderUser).
  - Visualización de catálogo de smartphones.
  - Filtros y búsqueda de productos.
  - Carrito de compras con contador y gestión de productos.
  - Páginas informativas (Home, About).
  - Sistema de paginación para productos.
  - Banner, newsletter y sección de marcas destacadas.
  - Descripción detallada de cada producto, galería de imágenes y variantes.
  - Navegación adaptada para dispositivos móviles.
  - Loader y skeletons para mejorar la experiencia de usuario.
  - Integración con Supabase para gestión de datos.

## Estructura del proyecto

  - `src/app`: Páginas principales.
  - `src/components`: Componentes reutilizables y específicos de cada sección.
  - `src/features`: Funcionalidades: carrito, productos y auth.
  - `src/common`: Constantes, helpers, interfaces y store global.
  - `src/data`: Scripts y datos iniciales.
  - `src/layouts`: Layout principal.
  - `src/router`: Configuración de rutas.
