import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Menu, X, ShoppingCart, Heart, LogOut, LogIn, UserPlus } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa"; // ✅ Import Address Icon
import logo from "../../assets/freshcart-logo.svg";

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-[#A6CDC6] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} width="120" alt="FreshCart Logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 text-gray-700">
            {userLogin && (
              <>
                <li><Link className="hover:text-green-600 transition" to="/">Home</Link></li>
                {/* <li><Link className="hover:text-green-600 transition" to="/cart">Cart</Link></li> */}
                <li><Link className="hover:text-green-600 transition" to="/products">Products</Link></li>
                <li><Link className="hover:text-green-600 transition" to="/categories">Categories</Link></li>
                <li><Link className="hover:text-green-600 transition" to="/brands">Brands</Link></li>
                {/* <li><Link className="hover:text-green-600 transition" to="/wishlist">Wishlist</Link></li> */}
              </>
            )}
          </ul>

          <div className="flex items-center space-x-4">
            {userLogin ? (
              <>
                <Link to="/wishlist" title="Wishlist" className="hidden lg:block text-gray-700 hover:text-red-500">
                  <Heart size={22} />
                </Link>

                <Link to="/cart" title="Cart" className="hidden lg:block text-gray-700 hover:text-green-500">
                  <ShoppingCart size={22} />
                </Link>

                <Link to="/add-address" title="Addresses" className="hidden lg:block text-gray-700 hover:text-blue-500">
                  <FaMapMarkerAlt size={22} />
                </Link>

                <span onClick={handleLogout} title="Sign Out" className="cursor-pointer text-gray-700 hover:text-red-500 flex items-center gap-1">
                  <LogOut size={20} />
                  <span className="hidden lg:inline">Sign Out</span>
                </span>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                  <LogIn size={20} />
                  <span className="hidden lg:inline">Login</span>
                </Link>
                <Link to="/register" className="flex items-center gap-1 text-gray-700 hover:text-green-500">
                  <UserPlus size={20} />
                  <span className="hidden lg:inline">Register</span>
                </Link>
              </>
            )}

            <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md py-4">
          <ul className="flex flex-col space-y-4 text-center text-gray-700">
            {userLogin ? (
              <>
                <li><Link className="block hover:text-green-600 transition" to="/">Home</Link></li>
                <li><Link className="block hover:text-green-600 transition" to="/cart">Cart</Link></li>
                <li><Link className="block hover:text-green-600 transition" to="/products">Products</Link></li>
                <li><Link className="block hover:text-green-600 transition" to="/categories">Categories</Link></li>
                <li><Link className="block hover:text-green-600 transition" to="/brands">Brands</Link></li>
                <li><Link className="block hover:text-green-600 transition" to="/wishlist">Wishlist</Link></li>
                <li><span onClick={handleLogout} className="block cursor-pointer hover:text-red-500">Sign Out</span></li>
              </>
            ) : (
              <>
                <li><Link className="block hover:text-blue-500 transition" to="/login">Login</Link></li>
                <li><Link className="block hover:text-green-500 transition" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
