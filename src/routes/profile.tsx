import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ProfileNav } from "@/components/ProfileNav";

export const Route = createFileRoute("/profile")({
  component: ProfileLayout,
});

function ProfileLayout() {
  return (
    <div className="rise-in mx-auto w-full max-w-5xl">
      <ProfileNav />
      <Outlet />
    </div>
  );
}
