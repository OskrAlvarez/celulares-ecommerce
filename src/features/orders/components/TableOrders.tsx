import { formatDateLong, formatPrice, getStatus } from "@/common/helpers";
import type { OrderItemSingle } from "@/common/interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  orders: OrderItemSingle[];
}

const tableHeaders = ["ID", "Fecha", "Estado", "Total"];

export function TableOrders({ orders }: Props) {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-full">
      <table className="text-sm w-full caption-bottom overflow-auto">
        <thead className="border-b border-gray-200 pb-5">
          <tr className="text-sm font-bold">
            {tableHeaders.map((item, index) => (
              <th key={index} className="h-12 px-4 text-left">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => navigate(`/account/orders/${order.id}`)}
            >
              <td className="p-4 font-medium tracking-tighter">{order.id}</td>
              <td className="p-4 font-medium tracking-tighter">
                {formatDateLong(order.created_at)}
              </td>
              <td className="p-4 font-medium tracking-tighter">
                {getStatus(order.status)}
              </td>
              <td className="p-4 font-medium tracking-tighter">
                {formatPrice(order.total_amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
