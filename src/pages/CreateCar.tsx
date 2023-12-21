import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import { Sidebar } from "../components/Sidebar";

const cars_api_base_url = "http://localhost:8082";

const CreateCar = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [sewa, setSewa] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    checkIsLoggedIn();
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFoto(selectedFile);

      // Membuat URL objek untuk file gambar yang dipilih
      const imageUrl = URL.createObjectURL(selectedFile);
      setFotoPreview(imageUrl);
    }
  };

  const logoutHandler = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin?");
    if (isConfirmed) {
      localStorage.removeItem("access_token");

      setIsLoggedIn(false);
      alert("Logout Berhasil");
    } else {
      alert("Logout dibatalkan");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("sewa", sewa);
    formData.append("ukuran", ukuran);
    formData.append("foto", foto);
    try {
      const response = await fetch(cars_api_base_url + "/api/cars", {
        method: "post",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      const responseJson = await response.json();

      if (response.status !== 201) {
        alert("error: " + responseJson.message);
      } else {
        alert("Mobil berhasil dibuat");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Terjadi Kesalahan dalam membuat data mobil", error);
      alert("Terjadi Kesalahan dalam membuat data mobil.");
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
            <div className="px-5 py-3">
              <h1 className="text-2xl font-semibold mb-5">ADD NEW CAR</h1>
              <form>
                <div className="mb-5">
                  <label
                    htmlFor="car"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Mobil
                  </label>
                  <input
                    type="car"
                    id="car"
                    className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm   focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="Masukan Nama Mobil"
                    required
                    onChange={({ target }) => {
                      setNama(target.value);
                    }}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="sewa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Harga Sewa
                  </label>
                  <input
                    type="sewa"
                    id="sewa"
                    className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm   focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="Masukan Harga Sewa"
                    required
                    onChange={({ target }) => {
                      setSewa(target.value);
                    }}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="ukuran"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ukuran
                  </label>

                  <select
                    id="ukuran"
                    className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm   focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    required
                    onChange={({ target }) => {
                      setUkuran(target.value);
                    }}
                  >
                    <option selected>Choose a size</option>
                    <option value="Large">Large</option>
                    <option value="Medium">Medium</option>
                    <option value="Small">Small</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="formFile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Foto
                  </label>
                  <input
                    className="w-80 relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                    onChange={handleImageChange}
                  />
                </div>

                {fotoPreview && (
                  <img
                    src={fotoPreview}
                    alt="Preview"
                    className="mt-3 max-w-full max-h-40 object-cover"
                  />
                )}

                <div>
                  <button
                    type="submit"
                    className="mr-3 bg-white-500 hover:bg-blue-300 text-[#0D28A6] font-bold py-2 px-4 focus:outline-none focus:shadow-outline outline-[#0D28A6]"
                    onClick={async (e) => {
                      e.preventDefault();

                      navigate("/dashboard");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="mr-3 bg-[#0D28A6] hover:bg-blue-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline "
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
