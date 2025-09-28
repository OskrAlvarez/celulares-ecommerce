import { useGlobalStore } from "@/common/store/global.store";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { RiSecurePaymentLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CartItem } from "./CartItem";
import { useCartStore } from "../store/cart.store";

export function Cart() {
  const closeSheet = useGlobalStore((state) => state.closeSheet);

  const cartItems = useCartStore((state) => state.items);
  const cleanCart = useCartStore((state) => state.cleanCart);
  const totalItems = useCartStore((state) => state.totalItems);
  console.log(cartItems)
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-7 flex justify-between items-center border-b border-slate-200">
        <span className="flex gap-3 items-center font-semibold">
          <HiOutlineShoppingBag size={20} />
          {totalItems} articulos
        </span>
        <button className="cursor-pointer" onClick={closeSheet}>
          <IoMdClose size={25} className="text-black" />
        </button>
      </div>
      {/* Lista de Productos añadidos al carrito */}
      {totalItems > 0
        ? (
              <>
        <div className="p-7 overflow-auto flex-1">
          <ul>
            {cartItems.map((cartItem, index) => (
              <CartItem
                key={`${cartItem.variantId}00${index}${cartItem.productId}#`}
                item={cartItem}
              />
            ))}
          </ul>
        </div>

        {/* Botones Accion*/}
        <div className="mt-4 p-8">
          <Link
            to={"/checkout"}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-full flex justify-center items-center gap-3"
          >
            <RiSecurePaymentLine size={24} />
            Continuar con la Compra
          </Link>

          <button
            onClick={cleanCart}
            className="mt-3 w-full text-black border border-black py-3 rounded-full"
          >
            Limpiar Carrito
          </button>
        </div>
      </>
        )
        : (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <p className="text-sm font-medium tracking-tight">
              Tu carrito esta Vacio
            </p>
            <Link to={'/smartphones'} className="py-4 bg-black text-white px-7 text-xs uppercase tracking-widest font-semibold" onClick={closeSheet}>
              Empezar a Comprar
            </Link>
          </div>
        )
      }



    </div>
  );
}
