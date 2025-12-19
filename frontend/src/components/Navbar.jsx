import React, { useState, useEffect ,useRef} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User2, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/Cartcontext";
import Cart from "./Cart";
import ProfileMenu from "./Profile-menu";
const Navbar = ({ showSignInModal }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { toggleCart, getCartItemsCount ,user,handleSetUser} = useCart();
  const [menuOpen2, setMenuOpen2] = useState(false);
  const menuRef = useRef(null)
 
  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setMenuOpen2((prev) => !prev); // Toggle menu
    } else {
      showSignInModal(true)
    }
  };
 const handleLogout=()=>{
  localStorage.removeItem("access_token");
  setMenuOpen2(false);
  handleSetUser(null);
  navigate("/");
 }
  const itemCount = getCartItemsCount();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Plants", path: "/plants" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact-us" },
  ];

  // Toggle sticky class on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav
      className={`w-full px-6 md:px-16 py-4 flex items-center justify-between font-[Poppins] z-50 transition-all duration-300 ${
        isSticky ? "fixed top-0 shadow-md bg-white/80" : "absolute top-[8vh]"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-black font-nunito tracking-wide text-emerald-700"
      >
        PLANTIFY
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 items-center text-sm font-semibold uppercase text-green-900">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `pb-1 transition ${
                  isActive
                    ? "border-b-2 border-black text-black"
                    : "hover:text-emerald-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="hidden md:flex items-center gap-5" >
        <input
          type="text"
          placeholder="Search our store"
          className="px-4 py-1.5 text-sm rounded-full bg-white/80 placeholder-gray-500 text-green-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
        <Search size={20} className="hover:text-emerald-600 cursor-pointer" />
        <div className="relative" ref={menuRef}>
                <button
                  onClick={handleUserClick}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    user ? "bg-green-800 text-white hover:bg-green-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {user ? (
                    <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <User2 size={20} />
                   )} 
                </button>

                {/* Profile Menu */}
                {user && (
                  <ProfileMenu
                    isOpen={menuOpen2}
                    onClose={() => setMenuOpen2(false)}
                    user={user}
                    onLogout={handleLogout}
                  />
                )}
              </div>
        

        <Heart size={22} className="hover:text-emerald-600 cursor-pointer" />
        <div className="relative cursor-pointer">
          <ShoppingCart
            size={22}
            onClick={toggleCart}
            className="hover:text-emerald-600 cursor-pointer"
          />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[rgb(121,163,7)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </div>
      
      {/* Mobile Hamburger */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-green-50/90 backdrop-blur-md px-6 py-4 space-y-4 text-green-800 font-semibold uppercase text-sm md:hidden">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-1 transition ${
                    isActive
                      ? "border-b-2 border-black text-black"
                      : "hover:text-emerald-600"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
