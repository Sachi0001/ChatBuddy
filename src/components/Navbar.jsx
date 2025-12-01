import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUsers } from '../utils/userSlice'

export const Navbar = () => {
  const user = useSelector((store)=>store.user)
 const dispatch = useDispatch()
 const navigate = useNavigate()
const handleLogOut = async () => {
  try {
    const res = await fetch(`${Base_Url}/logout`, {
      method: "POST",
      credentials: "include",   // IMPORTANT for cookies
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      console.log("Logged out successfully");
      dispatch(removeUsers())
      window.location.reload();

      navigate("/login")  
    } else {
      const data = await res.json();
      console.log("Logout failed:", data);
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};


  return (
      <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

    {user && 
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to={"/profile"} className="justify-between">
            Profile
          </Link>
        </li>

         <li>
          <Link to={"/connections"} className="justify-between">
            Your Connections
          </Link>
        </li>
        <li>

        <Link to={"/requests"}>Requsts</Link>
        </li>
        <li onClick={handleLogOut}><a>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
  )
}
