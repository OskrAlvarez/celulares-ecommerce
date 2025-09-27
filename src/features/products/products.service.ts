import { supabase } from "@/common/supabase/client";

export async function getProducts() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, variants(*)")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return products;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function getFilteredProducts({
  page = 1,
  brands = [],
}: {
  page: number;
  brands: string[];
}) {
  try {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("products")
      .select("*, variants(*)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (brands.length > 0) {
      query = query.in("brand", brands);
    }
    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching filtered products: ", error);
      throw new Error("Error fetching filtered products: " + error.message);
    }

    return { data, count };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function getRecentProducts() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, variants(*)")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      throw new Error("Error fetching recent products: ", error);
    }

    return products;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function getRandomProducts() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, variants(*)")
      .limit(20);

    if (error) {
      throw new Error("Error fetching recent products: ", error);
    }

    // Select 4 productos al azar
    const randomProducts = products
      ?.sort(() => 0.5 - Math.random())
      .slice(0, 4);

    return randomProducts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, variants(*)")
      .eq("slug", slug)
      .single()
    if (error) {
      throw new Error("Error fetching single product: ", error);
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
