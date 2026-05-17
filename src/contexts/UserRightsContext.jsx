import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const UserRightsContext = createContext({});

const ALL_RIGHTS = {
  CUST_VIEW: "CUST_VIEW",
  CUST_ADD: "CUST_ADD",
  CUST_EDIT: "CUST_EDIT",
  CUST_DEL: "CUST_DEL",
  CUST_VIEW_DELETED: "CUST_VIEW_DELETED",
  VIEW_SALES: "VIEW_SALES",
  VIEW_SALES_DETAIL: "VIEW_SALES_DETAIL",
  VIEW_PRODUCTS: "VIEW_PRODUCTS",
  VIEW_PRICE_HISTORY: "VIEW_PRICE_HISTORY",
  VIEW_ADMIN: "VIEW_ADMIN"
};

export function UserRightsProvider({ children }) {
  const { user, profile, loading: authLoading } = useAuth();
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Keep loading true if Auth is loading OR if user exists but profile is still fetching
    if (authLoading || (user && !profile)) {
      setLoading(true);
      return;
    }

    // 2. Only stop loading and clear rights if there's genuinely no authenticated user session
    if (!user) {
      setRights([]);
      setLoading(false);
      return;
    }

    // 3. Process the rights map cleanly once user and profile are completely loaded
    try {
      setError(null);
      const userType = profile?.user_type?.toUpperCase();
      let assignedRights = [];

      if (userType === "SUPERADMIN") {
        // Top Tier: Absolute system visibility + Full CRUD management
        assignedRights = Object.values(ALL_RIGHTS);
      } else if (userType === "ADMIN") {
        // Middle Tier (Old Sales Manager): Hides "Admin" sidebar link, but allows opening "Deleted Customers"
        assignedRights = [
          ALL_RIGHTS.CUST_VIEW,
          ALL_RIGHTS.CUST_VIEW_DELETED, // Allows seeing /deleted-customers in sidebar
          ALL_RIGHTS.VIEW_SALES,
          ALL_RIGHTS.VIEW_SALES_DETAIL,
          ALL_RIGHTS.VIEW_PRODUCTS,
          ALL_RIGHTS.VIEW_PRICE_HISTORY,
          // ALL_RIGHTS.VIEW_ADMIN is removed here so they cannot see the Admin sidebar link!
        ];
      } else if (userType === "USER") {
        // Lowest Tier: Standard read-only access, completely hidden administrative blocks
        assignedRights = [
          ALL_RIGHTS.CUST_VIEW,
          ALL_RIGHTS.VIEW_SALES,
          ALL_RIGHTS.VIEW_SALES_DETAIL,
          ALL_RIGHTS.VIEW_PRODUCTS,
          ALL_RIGHTS.VIEW_PRICE_HISTORY,
        ];
      }

      setRights(assignedRights);
    } catch (err) {
      console.error("User rights assignment error:", err.message);
      setError(err.message);
      setRights([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, profile?.user_type, authLoading]);

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

export function useRights() {
  return useContext(UserRightsContext);
}