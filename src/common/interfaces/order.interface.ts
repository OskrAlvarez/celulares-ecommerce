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
