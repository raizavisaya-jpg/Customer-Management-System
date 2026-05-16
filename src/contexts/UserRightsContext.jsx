import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/SupabaseClient";
import { useAuth } from "./AuthContext";

const UserRightsContext = createContext({});

const DEFAULT_RIGHTS = [
  "VIEW_CUSTOMERS",
  "ADD_CUSTOMER",
  "UPDATE_CUSTOMER",
  "SOFT_DELETE_CUSTOMER",
  "RECOVER_CUSTOMER",
  "VIEW_SALES",
  "VIEW_SALES_DETAIL",
  "VIEW_PRODUCTS",
  "VIEW_PRICE_HISTORY",
];

export function UserRightsProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadRights(userId) {
    try {
      setLoading(true);
      setError(null);

      // Sprint 2: load the 9 defined rights after login.
      // This can be replaced with a database query once the rights table is finalized.
      const loadedRights = DEFAULT_RIGHTS;

      setRights(loadedRights);
    } catch (err) {
      console.error("User rights load error:", err.message);
      setError(err.message);
      setRights([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user?.id) {
      setRights([]);
      setLoading(false);
      return;
    }

    loadRights(user.id);
  }, [user?.id, authLoading]);

  const value = useMemo(
    () => ({
      rights,
      loading,
      error,
      hasRight: (rightName) => rights.includes(rightName),
    }),
    [rights, loading, error]
  );

  return (
    <UserRightsContext.Provider value={value}>
      {children}
    </UserRightsContext.Provider>
  );
}

export function useUserRights() {
  return useContext(UserRightsContext);
}