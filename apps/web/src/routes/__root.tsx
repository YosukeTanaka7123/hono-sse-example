import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "~/components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col h-full">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  ),
});
