import { Link } from "react-router-dom";


export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <div className="w-full">
      <nav className="flex items-center justify-between px-10 bg-white  border-b">
        <div className="flex items-center  rounded-md space-x-3 w-96 ">
          <img
            src="https://i.ibb.co/Fx074Zt/Rectangle-62.png"
            alt="Logo"
            className="object-cover  my-4 "
          />
        </div>
        <div>
          {isLoggedIn ? (
            <button
              className="ml-4 py-2 px-3 bg-black text-white rounded-lg"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/">
              <button className="ml-4 py-2 px-3 bg-black text-white rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
