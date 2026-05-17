import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const UserRightsContext = createContext({});

// The 9 distinct system rights required by your Sprint rules
const ALL_RIGHTS = {
  CUST_VIEW: "CUST_VIEW",
  CUST_ADD: "CUST_ADD",
  CUST_EDIT: "CUST_EDIT",
  CUST_DEL: "CUST_DEL",
  VIEW_SALES: "VIEW_SALES",
  VIEW_SALES_DETAIL: "VIEW_SALES_DETAIL",
  VIEW_PRODUCTS: "VIEW_PRODUCTS",
  VIEW_PRICE_HISTORY: "VIEW_PRICE_HISTORY",
  VIEW_ADMIN: "VIEW_ADMIN"
};

export function UserRightsProvider({ children }) {
  // Pull both user and their database profile from AuthContext
  const { user, profile, loading: authLoading } = useAuth();
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If Auth is still figuring out if a user is logged in, keep loading
    if (authLoading) {
      setLoading(true);
      return;
    }

    // If no user or profile is found, wipe rights and stop loading
    if (!user || !profile) {
      setRights([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userType = profile.user_type?.toUpperCase();
      let assignedRights = [];

      // Map the 9 distinct rights exactly to the user types
      if (userType === "SUPERADMIN") {
        // SUPERADMIN gets absolutely everything
        assignedRights = Object.values(ALL_RIGHTS);
      } else if (userType === "SALES_MANAGER") {
        // SALES_MANAGER can view everything, add, and edit customers (NO CUST_DEL, NO VIEW_ADMIN)
        assignedRights = [
          ALL_RIGHTS.CUST_VIEW,
          ALL_RIGHTS.CUST_ADD,
          ALL_RIGHTS.CUST_EDIT,
          ALL_RIGHTS.VIEW_SALES,
          ALL_RIGHTS.VIEW_SALES_DETAIL,
          ALL_RIGHTS.VIEW_PRODUCTS,
          ALL_RIGHTS.VIEW_PRICE_HISTORY,
        ];
      } else if (userType === "USER") {
        // USER is strictly view-only for basic pages, no customer modifications, no admin, no deleted customers
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
  }, [user, profile, authLoading]);

  const value = useMemo(
    () => ({
      rights,
      loading,
      error,
      // Helper function to check if a user has a specific permission
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

// Custom hook to use rights anywhere in the application
export function useRights() {
  return useContext(UserRightsContext);
}