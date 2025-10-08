import { formatPrice } from "@/common/helpers";
import { Loader } from "@/components";
import { useOrder } from "@/features/orders";
import { CiCircleCheck } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";

export function ThankYou() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOrder(Number(id));

  if (isError) return <div>Hubo un error al cargar tu pedido</div>;

  if (isLoading || !data) return <Loader />;

  return (
    <div className="flex flex-col h-screen mt-6">
      <main className="container flex flex-1 flex-col items-center gap-10">
        <div className="flex gap-3 items-center">
          <CiCircleCheck size={40} />
          <p className="text-4xl">¡Gracias, {data.customer.full_name}!</p>
        </div>
        <div className="border border-slate-200 w-full md:w-[600px] p-5 rounded-md space-y-3">
          <h3 className="font-medium">Tu pedido está confirmado</h3>

          <p className="text-sm">
            Gracias por realizar tu compra en Celularesbaratos. Para realizar la
            transferencia te compartimos los siguientes datos
          </p>

          <div className="space-y-0.5 text-sm">
            <p>Compra a traves de transferencia Bancaria</p>
            <p>Banco Venezuela</p>
            <p>Razon Social: CelularesBaratos</p>
            <p>CI: 12345698</p>
            <p>Tipo de Cuenta: Corriente</p>
            <p>Numero de cuenta: 1234567890</p>
          </div>

          <p className="text-sm">
            Una vez realizada la transferencia, comparte tu comprobante a
            ventas@celularesbaratos.com para procesarla y hacerte la entrega de
            tu dispositivo a domicilio.
          </p>
        </div>

        <div className="border border-slate-200 w-full p-5 rounded-md space-y-3 md:w-[600px]">
          <h3 className="font-medium">Detalles del pedido</h3>
          <div className="flex flex-col gap-5">
            <ul className="space-y-3">
              {data.order_items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center gap-3"
                >
                  <div className="flex">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex items-center flex-1 space-y-2">
                    <div className="flex flex-col">
                      <p className="font-semibold">{item.product_name}</p>
                      <p className="text-[13px] text-gray-600">
                        {item.storage} / {item.color_name}
                      </p>
                      <p className="text-sm font-medium text-gray-600 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                {formatPrice(data.total_amount)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Información de contacto:</p>
              <p>{data.customer.email}</p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Métodos de pago:</p>
              <p>Deposito bancario - {formatPrice(data.total_amount)}</p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Dirección de envío</p>
              <p>
                {data.address.country} Edo. {data.address.state}, {data.address.city}, {data.address.adress_line1} {data.address.adress_line2 && data.address.adress_line2}   {data.address.postal_code}
              </p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Método de envío</p>
              <p>Standard</p>
            </div>
          </div>
        </div>
          <div className="flex flex-col justify-between items-center w-full mb-5 gap-1 sm:flex-row md:w-[600px] md:gap-0 lg:gap-0">
            <p className="text-sm">
              ¿Necesitas ayuda? Ponte en contacto con nosotros
            </p>

            <Link
              to="/smartphones"
              className="text-white bg-indigo-600 py-4 text-sm rounded-md px-5 tracking-tight font-semibold"
            >
              Seguir comprando
            </Link>
          </div>
      </main>
    </div>
  );
}
