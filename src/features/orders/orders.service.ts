import { supabase } from "@/common/supabase/client";

export async function getOrdersByCustomerId() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", data.user.id)
      .single();

    if (customerError) {
      throw new Error(customerError.message);
    }

    const customerId = customer.id;

    const { data: ordersUser, error: errorOrdersUser } = await supabase
      .from("orders")
      .select("id, total_amount, status, created_at")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (errorOrdersUser) {
      throw new Error(errorOrdersUser.message);
    }

    return ordersUser;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function getOrdersById(orderId: number) {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", data.user.id)
      .single();

    if (customerError) {
      throw new Error(customerError.message);
    }

    const customerId = customer.id;

    const {data:order, error: orderError} = await supabase
      .from("orders")
      .select(
        "*, addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name, storage, products(name, images)))"
      )
      .eq("customer_id", customerId)
      .eq("id", orderId)
      .single();

      if (orderError) {
        throw new Error(orderError.message);
      }

      return {
        customer: {
          full_name: order.customers.full_name,
          email: order.customers.email
        },
        total_amount: order.total_amount,
        status: order.status,
        address: {
          adress_line1: order.addresses.address_line1,
          adress_line2: order.addresses.address_line2,
          city: order.addresses.city,
          state: order.addresses.state,
          postal_code: order.addresses.postal_code,
          country: order.addresses.country,
        },
        created_at: order.created_at,
        order_items: order.order_items.map((item) => ({
          quantity: item.quantity,
          price: item.price,
          color_name: item.variants.color_name,
          storage: item.variants.storage,
          product_name: item.variants.products.name,
          product_image: item.variants.products.images[0]
        }))
      }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
