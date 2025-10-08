import { useCartStore } from "@/features/cart";
import { FormCheckout, ItemsCheckout } from "@/features/checkout";
import { Link } from "react-router-dom";

export function Checkout() {
  const totalItems = useCartStore((state) => state.totalItems)

  return (
      <div style={{ height: "calc(100vh - 100px)" }}>
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
