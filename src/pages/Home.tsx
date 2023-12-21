// import { PlusCircleIcon } from "@heroicons/react/20/solid";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Sidebar } from "../components/Sidebar";

// interface UserEntity {
//   id: number;
//   name: string;
//   email: string;
//   profile_picture_url: string;
// }

// interface TweetEntity {
//   id: number;
//   content: string;
//   user: UserEntity;
// }

// interface CarEntity {
//   id: number;
//   nama: string;
//   sewa: string;
//   ukuran: string;
//   foto: string;
//   user_id?: UserEntity;
//   updated_by?: UserEntity;
//   deleted_by?: UserEntity;
//   created_at?: Date;
//   updated_at?: Date;
//   deleted_at?: Date;
//   user?: UserEntity;
// }

// const tweets_api_base_url = "http://localhost:8082";

// export default function Home() {
//   const [tweets, setTweets] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { carId } = useParams();

//   useEffect(() => {
//     const fetchTweets = async () => {
//       const response = await fetch(tweets_api_base_url + "/api/tweets");
//       const responseJSON = await response.json();

//       setTweets(responseJSON.data.tweets);
//     };

//     const fetchCars = async () => {
//       const response = await fetch(tweets_api_base_url + "/api/cars");
//       const responseJSON = await response.json();
//       console.log("response mobil", responseJSON);
//       setCars(responseJSON.data.cars);
//     };
//     const fetchUsers = async () => {
//       const response = await fetch(tweets_api_base_url + "/api/users");
//       const responseJSON = await response.json();
//       console.log("users", responseJSON);

//       setUsers(responseJSON.data.users);
//     };
//     const checkIsLoggedIn = () => {
//       const accessToken = localStorage.getItem("access_token");

//       if (accessToken) setIsLoggedIn(true);
//       else setIsLoggedIn(false);
//     };

//     fetchTweets();
//     fetchUsers();
//     fetchCars();
//     checkIsLoggedIn();
//   }, []);

//   const logoutHandler = () => {
//     const isConfirmed = window.confirm("Apakah Anda yakin?");
//     if (isConfirmed) {
//       localStorage.removeItem("access_token");

//       setIsLoggedIn(false);
//       alert("Logout Berhasil");
//     } else {
//       alert("Logout dibatalkan");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const accessToken = localStorage.getItem("access_token");

//       console.log("accessToken", accessToken);

//       if (!accessToken) {
//         // Handle jika access_token tidak tersedia
//         alert("Access token not found. Please log in.");
//         return;
//       }
//       const userResponse = await fetch(tweets_api_base_url + "/api/auth/me", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (!userResponse.ok) {
//         // Handle jika mendapatkan error saat mengambil informasi pengguna
//         console.log("User Response:", userResponse);

//         const errorData = await userResponse.json();
//         throw new Error(errorData.message);
//       }
//       const userData = await userResponse.json();

//       // Mendapatkan nilai deleted_by dari informasi pengguna
//       const deletedBy = userData.data.id;

//       // Mengirim permintaan DELETE ke backend dengan nilai deleted_by
//       const response = await fetch(`http://localhost:8082/api/cars/${carId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           deleted_by: deletedBy,
//         }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message);
//       }
//       // Handle berhasil menghapus, mungkin perlu menyegarkan halaman atau mengubah state lokal
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="flex w-full min-h-screen">
//       <Sidebar />
//       <div className=" p-5 bg-gray-200 ml-5">
//         <div className="flex justify-between">
//           <h1 className="font-bold text-3xl">Home</h1>
//           {isLoggedIn ? (
//             <button
//               className="py-2 px-3 bg-black text-white rounded-lg"
//               onClick={logoutHandler}
//             >
//               Logout
//             </button>
//           ) : (
//             <Link to="/login">
//               <button className="py-2 px-3 bg-black text-white rounded-lg">
//                 Login
//               </button>
//             </Link>
//           )}
//         </div>

//         <div className="mt-[30px]">
//           <div className="flex items-center justify-between">
//             <h1 className="font-bold text-xl">List Tweet</h1>
//             {isLoggedIn && (
//               <Link to="/create-tweet">
//                 <button className="py-2 px-3  text-white rounded-lg">
//                   <PlusCircleIcon className="w-8 h-8 text-black" />
//                 </button>
//               </Link>
//             )}
//           </div>
//           {/* <div className="mt-[10px]">
//             {!tweets.length && <div>Data kosong</div>}

//             {tweets &&
//               tweets.map((tweet: TweetEntity) => (
//                 <div key={tweet.id} className="mt-3">
//                   <h3>{tweet.content}</h3>
//                   <p>
//                     Dibuat oleh <strong>{tweet.user.name}</strong>
//                   </p>
//                 </div>
//               ))}
//           </div> */}

//           <table className="border-collapse mt-10 w-full  ">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300 ">
//                   Tweet
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Dibuat oleh
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {!tweets.length ? (
//                 <tr>
//                   <td className="border px-4 py-2" colSpan={2}>
//                     Data kosong
//                   </td>
//                 </tr>
//               ) : (
//                 tweets.map((tweet: TweetEntity) => (
//                   <tr key={tweet.id}>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {tweet.content}
//                     </td>
//                     <td className="border px-4 py-2 border-gray-300">
//                       Dibuat oleh <strong>{tweet.user.name}</strong>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           <div className="flex items-center justify-between">
//             <h1 className="font-bold text-xl">List Users</h1>
//             <Link to="/create-user">
//               <button className="py-2 px-3  text-white rounded-lg">
//                 <PlusCircleIcon className="w-8 h-8 text-black" />
//               </button>
//             </Link>
//           </div>

//           <table className="border-collapse mt-10 w-full  ">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300 ">
//                   Nama
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Email
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Foto
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {!users.length ? (
//                 <tr>
//                   <td className="border px-4 py-2" colSpan={3}>
//                     Data kosong
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user: UserEntity) => (
//                   <tr key={user.id}>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {user.name}
//                     </td>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {user.email}
//                     </td>
//                     <img
//                       src={user.profile_picture_url}
//                       alt={`Profile ${user.name}`}
//                       className=" object-cover rounded-full text-center"
//                     />
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           <div className="flex items-center justify-between">
//             <h1 className="font-bold text-xl">List CARS</h1>
//             <Link to="/create-car">
//               {/* <button className="py-2 px-3  text-white rounded-lg">
//                 <PlusCircleIcon className="w-8 h-8 text-black" />
//               </button> */}
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                 type="button"
//               >
//                 Tambah Data
//               </button>
//             </Link>
//           </div>

//           <table className="border-collapse mt-10 w-full  ">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300 ">
//                   Nama
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Sewa
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Ukuran
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Foto
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Created_At
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Dibuat Oleh
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Action
//                 </th>
//                 {/* <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Updated_At
//                 </th>
//                 <th className="border px-4 py-2 bg-gray-300 border-gray-300">
//                   Deleted_At
//                 </th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {!cars.length ? (
//                 <tr>
//                   <td className="border px-4 py-2" colSpan={7}>
//                     Data kosong
//                   </td>
//                 </tr>
//               ) : (
//                 cars.map((car: CarEntity) => (
//                   <tr key={car.id}>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {car.nama}
//                     </td>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {car.sewa}
//                     </td>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {car.ukuran}
//                     </td>
//                     <td>
//                       <img
//                         src={car.foto}
//                         alt={`Profile ${car.nama}`}
//                         className=" object-fit text-center w-40 h-40"
//                       />
//                     </td>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {car.created_at?.toLocaleString()}
//                     </td>
//                     <td className="border px-4 py-2 border-gray-300">
//                       {" "}
//                       Dibuat Oleh <strong>{car.user.name}</strong>
//                     </td>
//                     <td className="border px-4 py-2 border-gray-300 ">
//                       <div className="">
//                         <Link to="/update-car">
//                           <button
//                             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                             type="button"
//                           >
//                             Update
//                           </button>
//                         </Link>
//                         <button
//                           className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-5"
//                           type="button"
//                           onClick={handleDelete}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
