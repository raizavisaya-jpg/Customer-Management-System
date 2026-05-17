import { supabase } from "../lib/SupabaseClient";

const CUSTOMER_TABLE = "customer";

export async function getCustomers(userType = "USER") {
  let query = supabase
    .from(CUSTOMER_TABLE)
    .select("*")
    .order("custno", { ascending: true });

  // USER can only see active customers
  if (userType === "USER") {
    query = query.eq("record_status", "ACTIVE");
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addCustomer(customerData) {
  const { data, error } = await supabase
    .from(CUSTOMER_TABLE)
    .insert([
      {
        ...customerData,
        record_status: "ACTIVE",
        stamp: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateCustomer(custno, customerData) {
  const { data, error } = await supabase
    .from(CUSTOMER_TABLE)
    .update({
      ...customerData,
      stamp: new Date().toISOString(),
    })
    .eq("custno", custno)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function softDeleteCustomer(custno) {
  const { data, error } = await supabase
    .from(CUSTOMER_TABLE)
    .update({
      record_status: "DELETED",
      stamp: new Date().toISOString(),
    })
    .eq("custno", custno)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function recoverCustomer(custno) {
  const { data, error } = await supabase
    .from(CUSTOMER_TABLE)
    .update({
      record_status: "ACTIVE",
      stamp: new Date().toISOString(),
    })
    .eq("custno", custno)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}