import { useForm } from "react-hook-form";
import { InputAddress } from "./InputAddress";
import { AdressSchema, type AdressFormValues } from "../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemsCheckout } from "./ItemsCheckout";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useCartStore } from "@/features/cart";
import { ImSpinner2 } from "react-icons/im";

export function FormCheckout() {
  const {
    register,
    formState: {
    errors
  },
  handleSubmit
 } = useForm<AdressFormValues>({
    resolver: zodResolver(AdressSchema),
  });

  const { mutate, isPending } = useCreateOrder()

  const cleanCart = useCartStore(state => state.cleanCart)
  const cartItems = useCartStore(state => state.items)
  const totalAmount = useCartStore(state => state.totalAmount)

  const onSubmit = handleSubmit(data => {
    const orderInput = {
      address: data,
      cartItems: cartItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
    }

    mutate(orderInput, {
      onSuccess: () => {
        cleanCart()
      }
    })
  })

  if (isPending) {
    return <div className="flex flex-col h-screen items-center justify-center gap-3">
      <ImSpinner2 className="animate-spin h-10 w-10" size={40} />
      <p className="text-sm font-medium">Procesando Orden...</p>
    </div>
  }
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-normal">Entrega</h3>

          <InputAddress
            register={register}
            errors={errors}
            name="adressLine1"
            placeholder="Dirección Principal"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="adressLine2"
            placeholder="Dirección Adicional (Opcional)"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="state"
            placeholder="Estado / Provincia"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="postalCode"
            placeholder="Codigo Postal (Opcional)"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="city"
            placeholder="Ciudad"
          />

          <select {...register('country')} className="border border-slate-200 rounded-md p-3">
            <option value="Venezuela">Venezuela</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Métodos de Envío</p>
          <div className="flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-md px-6">
            <span className="font-normal">Standard</span>
            <span className="font-semibold">Gratis</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-ss-md rounded-se-md px-6">
            <span>Deposito Bancario</span>
          </div>

          <div className="bg-stone-100 text-[13px] p-5 space-y-0.5 border border-gray-200 rounded-es-md rounded-ee-md">
            <p>Compra a traves de transferencia Bancaria</p>
            <p>Banco Venezuela</p>
            <p>Razon Social: CelularesBaratos</p>
            <p>CI: 12345698</p>
            <p>Tipo de Cuenta: Corriente</p>
            <p>Numero de cuenta: 1234567890</p>
            <p>
              La información será compartida nuevamente una vez haya finalizado
              la compra
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="font-semibold text-3xl">Resumen del Pedido</h3>
          {/* Lista de Productos del Carrito */}
          <ItemsCheckout />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-3.5 font-bold tracking-wide rounded-md mt-2 mb-4"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}
