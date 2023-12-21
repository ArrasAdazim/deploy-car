import { Link } from "react-router-dom";

export default function LeftBar() {
  return (
    <div
      className={" flex flex-col  w-[300px] gap-y-2 border-r-8 min-h-screen"}
    >
      <Link
        to={"/dashboard"}
        className=" h-10 w-full py-3 pl-6 mt-4 font-bold text-sm text-[#8A8A8A] "
      >
        CARS
      </Link>
      <Link
        to={"/dashboard"}
        className=" h-10 w-full py-3 pl-6 hover:bg-[#CFD4ED] font-bold text-sm "
      >
        LIST CAR
      </Link>
    </div>
  );
}
