import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const UserRightsContext = createContext({});

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
  const { user, profile, loading: authLoading } = useAuth();
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. If Auth is still loading its session, match its loading status and wait
    if (authLoading) {
      setLoading(true);
      return;
    }

    // 2. If Auth finished loading and there's no active session, drop loading immediately
    if (!user || !profile) {
      setRights([]);
      setLoading(false);
      return;
    }

    // 3. If we have a user and profile, process the rights map cleanly
    try {
      setError(null);
      const userType = profile.user_type?.toUpperCase();
      let assignedRights = [];

      if (userType === "SUPERADMIN") {
        assignedRights = Object.values(ALL_RIGHTS);
      } else if (userType === "SALES_MANAGER") {
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
      // 4. Force state update confirmation
      setLoading(false);
    }
  }, [user, profile, authLoading]);

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