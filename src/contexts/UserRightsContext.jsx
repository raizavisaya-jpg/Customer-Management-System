import { createContext, useContext, useEffect, useMemo, useState } from "react";
<<<<<<< HEAD
=======
import { supabase } from "../lib/SupabaseClient";
>>>>>>> origin/dev
import { useAuth } from "./AuthContext";

const UserRightsContext = createContext({});

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/dev
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
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

=======
  async function loadRights(userId) {
>>>>>>> origin/dev
    try {
      setLoading(true);
      setError(null);

<<<<<<< HEAD
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
=======
      // Sprint 2: load the 9 defined rights after login.
      // This can be replaced with a database query once the rights table is finalized.
      const loadedRights = DEFAULT_RIGHTS;

      setRights(loadedRights);
    } catch (err) {
      console.error("User rights load error:", err.message);
>>>>>>> origin/dev
      setError(err.message);
      setRights([]);
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
  }, [user, profile, authLoading]);
=======
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
>>>>>>> origin/dev

  const value = useMemo(
    () => ({
      rights,
      loading,
      error,
<<<<<<< HEAD
      // Helper function to check if a user has a specific permission
=======
>>>>>>> origin/dev
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

<<<<<<< HEAD
// Custom hook to use rights anywhere in the application
export function useRights() {
=======
export function useUserRights() {
>>>>>>> origin/dev
  return useContext(UserRightsContext);
}