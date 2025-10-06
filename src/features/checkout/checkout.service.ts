import type { OrderInput } from "@/common/interfaces";
import { supabase } from "@/common/supabase/client";

export async function createOrder(order: OrderInput) {
  try {
    // 1. Obtener el usuario autenticado + Cliente de la tabla customers
    const { data, error: errorUser } = await supabase.auth.getUser();
    if (errorUser) {
      throw new Error(errorUser.message);
    }
    const userId = data.user.id;

    // 1.1. Obtener el usuario de la tabla customers
    const { data: customer, error: errorCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (errorCustomer) {
      throw new Error(errorCustomer.message);
    }
    const customerId = customer.id;

    // 2. Verificar que haya stock para cada variante del carrito
    for (const item of order.cartItems) {
      const { data: variantData, error: variantError } = await supabase
        .from("variants")
        .select("stock")
        .eq("id", item.variantId)
        .single();

      if (variantError) {
        throw new Error(variantError.message);
      }
      if (variantData.stock < item.quantity) {
        throw new Error("No hay stock suficiente para los productos seleccionados.");

      }
    }
    //  3. Guardar la direccion del envio en la tabla addresses
    const { data: addressData, error:errorAddress } = await supabase.from('addresses').insert({
      address_line1: order.address.adressLine1,
      address_line2: order.address.adressLine2,
      city: order.address.city,
      state: order.address.state,
      postal_code: order.address.postalCode,
      country: order.address.country,
      customer_id: customerId,
    }).select().single()

    if (errorAddress) {
      throw new Error(errorAddress.message);
    }
    // 4. Crear la orden en la tabla orders
    const {data: orderData, error: errorOrderData} = await supabase.from('orders').insert({
      address_id: addressData.id,
      customer_id: customerId,
      total_amount: order.totalAmount,
      status: 'Pending'
    }).select().single()

    if (errorOrderData) {
      throw new Error(errorOrderData.message);
    }

    //  5. Guardar detalles de la orden
    const orderItems = order.cartItems.map(item => ({
      order_id: orderData.id,
      variant_id: item.variantId,
      quantity: item.quantity,
      price: item.price
    }))

    const {error: errorOrderItems} = await supabase.from('order_items').insert(orderItems)
    if (errorOrderItems) {
      throw new Error(errorOrderItems.message);
    }
    // 6. Actualizar el stock de las variantes
    for (const item of order.cartItems) {
      // Obtenemos el stock actual
      const {data: variantData } = await supabase
        .from('variants')
        .select('stock')
        .eq('id', item.variantId)
        .single()

      if (!variantData) {
        throw new Error("No se encontró la variante del producto.");
      }
      const newStock = variantData.stock - item.quantity

      // Actualizar el stock
      const { error: updatedStockError } = await supabase
        .from('variants')
        .update({ stock: newStock })
        .eq('id', item.variantId)

      if (updatedStockError) {
        throw new Error(`No se pudo actualizar el stock de la variante ${updatedStockError.message}`);

      }
    }

    return orderData

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
