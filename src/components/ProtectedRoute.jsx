import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
import { useRights } from "../contexts/UserRightsContext";

export default function ProtectedRoute({ children, requiredRight }) {
  const location = useLocation();
  const { user, profile, loading: authLoading } = useAuth();
  const { hasRight, loading: rightsLoading } = useRights();

  // 1. If contexts are still processing data, keep spinner running
  if (authLoading || rightsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Not logged into a Supabase auth account? Kick to login screen
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. SECURITY GATE: Logged in, but no database profile exists yet? 
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // 4. Suspended account check
  if (profile.record_status !== "ACTIVE") {
    return <Navigate to="/login" replace />;
  }

  // 5. Sprint Permission Guard: If they lack the required security permission, block access
  if (requiredRight && !hasRight(requiredRight)) {
    if (requiredRight === "CUST_VIEW" || !hasRight("CUST_VIEW")) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/customers" replace />;
  }

  return children;
}