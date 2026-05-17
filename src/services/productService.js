import { supabase } from "../lib/SupabaseClient";

const PRODUCT_TABLE = "product";
const PRICE_HISTORY_TABLE = "priceHist";

export async function getProducts() {
  const { data, error } = await supabase
    .from(PRODUCT_TABLE)
    .select("*")
    .order("prodCode", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPriceHistory(prodCode) {
  const { data, error } = await supabase
    .from(PRICE_HISTORY_TABLE)
    .select("*")
    .eq("prodCode", prodCode)
    .order("effDate", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentPrice(prodCode) {
  const { data, error } = await supabase
    .from(PRICE_HISTORY_TABLE)
    .select("*")
    .eq("prodCode", prodCode)
    .order("effDate", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}