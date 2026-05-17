import { supabase } from "../lib/SupabaseClient";

const SALES_TABLE = "sales";
const SALES_DETAIL_TABLE = "salesDetail";

export async function getSalesByCustomer(custNo) {
  const { data, error } = await supabase
    .from(SALES_TABLE)
    .select("*")
    .eq("custNo", custNo)
    .order("salesDate", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSalesDetail(transNo) {
  const { data, error } = await supabase
    .from(SALES_DETAIL_TABLE)
    .select("*")
    .eq("transNo", transNo)
    .order("prodCode", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}