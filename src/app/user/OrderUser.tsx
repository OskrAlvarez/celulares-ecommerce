import { Loader } from "@/components";
import { useOrder } from "@/features/orders";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { formatDateLong, formatPrice } from "@/common/helpers";

const tableHeaders = ["Producto", "Cantidad", "Total"];

export function OrderUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(Number(id));

  if (isLoading || !order) return <Loader />;

  return (
    <div>
      <div className="flex flex-col justify-between items-center gap-5 md:flex-row md:gap-0">
        <button
          className="border rounded-full py-2 border-slate-200 px-5 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest hover:bg-stone-100 transition-all"
          onClick={() => navigate(-1)}
        >
          <IoChevronBackCircleSharp size={14} />
          Regresar a Pedidos
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-3xl font-bold">Pedido #{id}</h1>
          <p>{formatDateLong(order.created_at)}</p>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="flex flex-col mt-10 mb-5 gap-10">
        <table className="text-sm w-full caption-bottom overflow-auto">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="h-12 text-center uppercase tracking-wide text-stone-600 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.order_items.map((product, index) => (

              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 font-medium tracking-tighter flex gap-3 items-center">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="h-20 w-20 object-contain rounded-lg"
                  />
                  <div className="space-y-2">
                    <h3>{product.product_name}</h3>
                    <p className="text-xs">
                      {product.color_name}/{product.storage}
                    </p>
                    <p className="text-xs">{formatPrice(product.price)}</p>
                  </div>
                </td>
                <td className="p-4 font-medium tracking-tighter text-center">
                  {product.quantity}
                </td>
                <td className="p-4 font-medium tracking-tighter text-center">
                  {formatPrice(product.quantity * product.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-3 text-slate-600 text-sm self-end w-1/2">
          <div className="flex justify-between">
            <p>SubTotal: </p>
            <p>{formatPrice(order.total_amount)}</p>
          </div>
          <div className="flex justify-between">
            <p>Envio (Standard): </p>
            <p>{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between text-black font-semibold">
            <p>Total: </p>
            <p>{formatPrice(order.total_amount)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Dirección</h2>

          <div className="border border-stone-300 p-5 flex flex-col gap-5">
            <div className="space-y-1">
              <h3 className="font-medium">Cliente:</h3>
              <p>{order.customer.full_name}</p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <h3 className="font-medium text-base">Envío:</h3>
              <p>
                {order.address.country} Edo. {order.address.state}, {order.address.city}, {order.address.adress_line1} {order.address.adress_line2 && order.address.adress_line2}   {order.address.postal_code}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
