import Loading from "@/components/customs/Loading";
import useGlobalStore from "@/store";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const { isLoading } = useGlobalStore((state) => state);
  return (
    <div className="size-full">
      <Toaster />
      <Outlet />
      {isLoading && <Loading />}
    </div>
  );
};
export default Layout;
