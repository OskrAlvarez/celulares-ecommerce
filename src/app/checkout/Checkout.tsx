import { useCartStore } from "@/features/cart";
import { FormCheckout, ItemsCheckout } from "@/features/checkout";
import { Link } from "react-router-dom";

export function Checkout() {
  const totalItems = useCartStore((state) => state.totalItems)

  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <header className="h-[100px] bg-white text-black flex items-center justify-center flex-col px-10 border-b border-slate-200">
        <Link
          to="/"
          className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start"
        >
          <p>
            Celulares
            <span className="text-indigo-600">Baratos</span>
          </p>
        </Link>
      </header>
      <main className="w-full h-full flex relative">
        {totalItems === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-5 w-full"
            style={{ height: "calc(100vh - 100px)" }}
          >
            <p className="text-sm font-medium tracking-tight">
              Tu carrito esta Vacio
            </p>
            <Link
              to={"/smartphones"}
              className="py-4 bg-black text-white px-7 text-xs uppercase tracking-widest font-semibold"
            >
              Empezar a Comprar
            </Link>
          </div>
        ) : (
          <>
            <div  className='w-full md:w-[50%] p-10'>
              {/* Formulario de Direccion */}
              <FormCheckout />
            </div>

            <div
              className='bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block'
							style={{
								height: 'calc(100vh - 100px)',
							}}
            >
              {/* Elementos del Carrito */}
              <ItemsCheckout />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
