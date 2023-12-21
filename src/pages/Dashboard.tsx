import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import { Link, useNavigate } from "react-router-dom";

import { id } from "date-fns/locale";
import { format } from "date-fns";

interface CarEntity {
  id: number;
  nama: string;
  sewa: string;
  ukuran: string;
  foto: string;
  user_id?: UserEntity;
  updated_by?: UserEntity;
  deleted_by?: UserEntity;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  user?: UserEntity;
}

interface UserEntity {
  id: number;
  name: string;
  email: string;
  profile_picture_url: string;
}

const car_base_url = "http://localhost:8082";

export default function Dashboard() {
  const [cars, setCars] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch(car_base_url + "/api/cars");
      const responseJSON = await response.json();
      console.log("response mobil", responseJSON);
      setCars(responseJSON.data.cars);
    };

    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    fetchCars();
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

  const handleDelete = async (carId: number) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      console.log("accessToken", accessToken);

      if (!accessToken) {
        // Handle jika access_token tidak tersedia
        alert("Access token not found. Please log in.");
        return;
      }
      const userResponse = await fetch(car_base_url + "/api/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userResponse.ok) {
        // Handle jika mendapatkan error saat mengambil informasi pengguna
        console.log("User Response:", userResponse);

        const errorData = await userResponse.json();
        throw new Error(errorData.message);
      }
      const userData = await userResponse.json();

      // Mendapatkan nilai deleted_by dari informasi pengguna
      const deletedBy = userData.data.id;

      // Mengirim permintaan DELETE ke backend dengan nilai deleted_by
      const response = await fetch(`http://localhost:8082/api/cars/${carId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          deleted_by: deletedBy,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      window.location.reload(); // agar ada animasi reload
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />

        <div className="flex main-content">
          <LeftBar />
          <div className="p-4 flex gap-5">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl">List CARS</h1>
                {isLoggedIn && (
                  <Link to="/create-car">
                    <button
                      className="bg-[#0D28A6] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                      type="button"
                    >
                      Add Data
                    </button>
                  </Link>
                )}
              </div>
              <table className="border-collapse mt-10 w-full  ">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-[#CFD4ED] border-[#CFD4ED]">
                      No
                    </th>
                    <th className="border px-4 py-2 bg-[#CFD4ED] border-[#CFD4ED] ">
                      Name
                    </th>
                    <th className="border px-4 py-2 bg-[#CFD4ED] border-[#CFD4ED]">
                      Price
                    </th>
                    <th className="border px-4 py-2 bg-[#CFD4ED] border-[#CFD4ED]">
                      Category
                    </th>
                    {/* <th className="border px-4 py-2 bg-[#CFD4ED] border-[#CFD4ED]">
                      Foto
                    </th> */}
                    <th className="border px-4 py-2 bg-gray-300 border-gray-300">
                      Created_At
                    </th>
                    {/* <th className="border px-4 py-2 bg-gray-300 border-gray-300">
                      Dibuat Oleh
                    </th> */}
                    <th className="border px-4 py-2 bg-[#CFD4ED] border-[#CFD4ED]">
                      Updated_At
                    </th>
                    <th className="border px-4 py-2 bg-[#CFD4ED] border-[#CFD4ED]">
                      Action
                    </th>
                    {/* <th className="border px-4 py-2 bg-gray-300 border-gray-300">
                  Deleted_At
                </th> */}
                  </tr>
                </thead>
                <tbody>
                  {!cars.length ? (
                    <tr>
                      <td className="border px-4 py-2" colSpan={7}>
                        Data kosong
                      </td>
                    </tr>
                  ) : (
                    cars.map((car: CarEntity, index: number) => (
                      <tr key={car.id}>
                        <td className="border px-4 py-2 border-gray-300">
                          {index + 1}
                        </td>
                        <td className="border px-4 py-2 border-gray-300">
                          {car.nama}
                        </td>
                        <td className="border px-4 py-2 border-gray-300">
                          {car.sewa}
                        </td>
                        <td className="border px-4 py-2 border-gray-300">
                          {car.ukuran}
                        </td>
                        {/* <td>
                          <img
                            src={car.foto}
                            alt={`Profile ${car.nama}`}
                            className=" object-fit text-center w-40 h-40"
                          />
                        </td> */}
                        <td className="border px-4 py-2 border-gray-300">
                          {format(
                            new Date(car.created_at),
                            "dd MMMM yyyy HH:mm",
                            {
                              locale: id,
                            }
                          )}
                        </td>
                        <td className="border px-4 py-2 border-gray-300">
                          {format(
                            new Date(car.updated_at),
                            "dd MMMM yyyy HH:mm",
                            {
                              locale: id,
                            }
                          )}
                        </td>
                        {/* <td className="border px-4 py-2 border-gray-300">
                          {" "}
                          Dibuat Oleh <strong>{car.user.name}</strong>
                        </td> */}
                        <td className="border px-4 py-2 border-gray-300 ">
                          <div className="">
                            <Link to={`/update-car/${car.id}`}>
                              <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="button"
                              >
                                Update
                              </button>
                            </Link>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-5"
                              type="button"
                              onClick={() => handleDelete(car.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
