import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user, isAuthenticated } = useAuth();

  // Wait for hydration before deciding
  if (typeof window !== "undefined" && !user && !isAuthenticated) {
    const hasRaw = localStorage.getItem("pinkshield_user_v2");
    if (!hasRaw) return <Navigate to="/login" />;
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading your dashboard…</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
