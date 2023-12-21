import { HomeIcon, TruckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-y-5 bg-[#0D28A6] w-[80px]  min-h-screen  ">
      <div className=" "></div>
      <Link
        to="/"
        className="grid justify-center font-light content-center mt-2 text-white"
      >
        <img src="https://i.ibb.co/wJ9QjRL/Rectangle-63.png" alt="" />
      </Link>
      <Link
        to="/dashboard"
        className="grid justify-center font-light text-sm content-center mt-2 text-white"
      >
        <div className="grid justify-center ">
          <HomeIcon className="h-6 w-6 text-white" />
        </div>
        Dashboard
      </Link>
      <Link
        to="/listcars"
        className="grid justify-center content-center text-white"
      >
        <div className="grid justify-center">
          <TruckIcon className="h-6 w-6 text-white text-sm" />
        </div>
        Cars
      </Link>
    </div>
  );
};
