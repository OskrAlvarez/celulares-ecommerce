export interface OrderInput {
  address: {
    adressLine1: string;
    adressLine2?: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string
  };
  cartItems: {
    variantId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number
}


export interface OrderItemSingle {
  created_at: string;
  id: number;
  status: string;
  total_amount: number
}
