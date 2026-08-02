import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = () => {
  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-40 w-[88px] lg:w-[260px]">
          <Sidebar />
        </aside>

        <div className="flex min-h-screen w-full flex-col pl-[88px] lg:pl-[260px]">
          <div className="sticky top-0 z-30 px-3 pt-3 sm:px-5 sm:pt-4">
            <Header />
          </div>
          <main className="page-shell flex-1 py-5 sm:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Main;
