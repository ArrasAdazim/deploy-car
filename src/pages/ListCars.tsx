import { useEffect, useState } from "react";
import CardCard from "../components/CardCard";
import Navbar from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import LeftBar from "../components/LeftBar";
import { useNavigate } from "react-router-dom";

// const car_base_url = "http://localhost:8082";

export default function ListCars() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    checkIsLoggedIn();
  }, []);

  const logoutHandler = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin?");
    if (isConfirmed) {
      localStorage.removeItem("access_token");

      setIsLoggedIn(false);
      alert("Logout Berhasil");
      navigate("/");
    } else {
      alert("Logout dibatalkan");
    }
  };

  return (
    <div>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />

          <div className="flex main-content">
            <LeftBar />
            <div className="p-4 flex flex-wrap gap-5">
              <CardCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
