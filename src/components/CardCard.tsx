import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { id } from "date-fns/locale";
import { format } from "date-fns";

interface CarResponse {
  id: number;
  nama: string;
  sewa: string;
  ukuran: string;
  foto: string;
  user: UserEntity;
  created_at?: Date;
  updated_at?: Date;
}

interface UserEntity {
  id: number;
  name: string;
  email: string;
  profile_picture_url: string;
}

const car_base_url = "http://localhost:8082";

export default function CardCard() {
  const [cars, setCars] = useState([]);


  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch(car_base_url + "/api/cars");
      const responseJSON = await response.json();
      console.log("response mobil", responseJSON);
      setCars(responseJSON.data.cars);
    };

    fetchCars();
  }, []);

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
    <div className=" flex gap-5 flex-wrap justify-start">
      {cars.map((car: CarResponse) => (
        <div className="card" key={car.id}>
          <div className="w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg object-fit w-[350px] h-[200px]"
                src={car.foto}
                alt=""
              />
            </a>
            <div className="p-5 mb-3">
              <h3 className="text-lg">{car.nama} </h3>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {car.sewa}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Update at{" "}
                {format(new Date(car.updated_at), "dd MMMM yyyy HH:mm", {
                  locale: id,
                })}
              </p>
              <div className="">
                <button
                  className="bg-white hover:bg-red-700 text-red-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  mt-5 w-[120px] h-14 mr-4"
                  type="button"
                  onClick={() => handleDelete(car.id)}
                >
                  Delete
                </button>

                <Link to="/update-car">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[120px] h-14"
                    type="button"
                  >
                    Update
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
