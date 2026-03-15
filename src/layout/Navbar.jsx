import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuthContext from "../Hooks/useAuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //user test
  const { user, logoutUser } = useAuthContext();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu items based on your design
  const menuItems = [
    { name: "Home", path: "/", hasSub: true },
    { name: "Rooms", hasSub: true },
    { name: "Pages", hasSub: true },
    { name: "Offer", hasSub: true },
    { name: "Gallery", hasSub: false },
    { name: "Blog", hasSub: true },
    { name: "Contact Us", hasSub: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? "bg-[#1e2d35] shadow-xl py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Main Desktop/Tablet Header */}
          <div className="flex justify-between items-center text-white">
            {/* Logo Section */}
            <Link to="/">
              <div className="flex items-center gap-2 group cursor-pointer shrink-0">
                <div className="w-9 h-9 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center italic font-serif text-lg md:text-xl transition-all group-hover:bg-white group-hover:text-black">
                  C
                </div>
                <div className="flex flex-col leading-none">
                  <h1 className="text-xl md:text-2xl font-serif tracking-tight uppercase">
                    Carmelína
                  </h1>
                  <span className="text-[6px] md:text-[7px] uppercase tracking-[0.2em] opacity-70">
                    Hotel Booking & Resort
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation (Lg & Up) */}
            <ul className="hidden xl:flex gap-6 text-[11px] uppercase tracking-[0.15em] font-light font-sans">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="group relative cursor-pointer hover:text-stone-300 transition-colors py-2"
                >
                  {/* Apply the 'to' prop here. 
          The Link should wrap your content to make the whole area clickable.
      */}
                  <Link to={item.path}>
                    <span className="flex items-center gap-1">
                      {item.name}
                      {item.hasSub && (
                        <span className="text-[8px] opacity-60"></span>
                      )}
                    </span>
                  </Link>

                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b1a494] transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            {/*User check*/}
            {user ? (
              <>
                {/*when logged in */}
                <div className="flex gap-2 items-center">
                  {/* 1. Shopping Cart / Booking Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle text-slate-800" // Added explicit dark text
                    >
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {/* Red badge to make it pop */}
                        <span className="badge badge-sm badge-error indicator-item text-white">
                          8
                        </span>
                      </div>
                    </div>
                    <div
                      tabIndex={0}
                      className="card card-compact dropdown-content bg-white border border-slate-200 z-[10] mt-3 w-52 shadow-xl text-slate-800"
                    >
                      <div className="card-body">
                        <span className="text-lg font-bold">8 Items</span>
                        <span className="text-blue-600 font-medium">
                          Subtotal: $999
                        </span>
                        <div className="card-actions">
                          <Link to='/dashboard/bookings'>
                            <button className="btn bg-[#1e2d35] hover:bg-[#b1a494] text-white btn-block border-none">
                              View booking
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. User Profile Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar border-2 border-slate-100"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="User Profile"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0} // Changed from -1 to 0 for better focus
                      className="menu menu-sm dropdown-content bg-white text-slate-800 rounded-box z-[10] mt-3 w-52 p-2 shadow-xl border border-slate-100"
                    >
                      <li>
                        <Link
                          to="/dashboard/profile"
                          className="justify-between py-3"
                        >
                          Profile
                          <span className="badge badge-neutral">New</span>
                        </Link>
                      </li>
                      <li>
                        <a className="py-3">Settings</a>
                      </li>
                      <li>
                        <a
                          onClick={logoutUser}
                          className="py-3 text-error font-bold"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* 3. Mobile Hamburger Menu */}
                  <div
                    className="flex xl:hidden flex-col gap-1.5 cursor-pointer ml-2 p-2 rounded-lg hover:bg-slate-100 transition-all"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    {/* Changed bg-white to bg-slate-800 so it's visible on light backgrounds */}
                    <div className="w-6 h-[2px] bg-slate-800"></div>
                    <div className="w-6 h-[2px] bg-slate-800"></div>
                    <div className="w-4 h-[2px] bg-slate-800"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/*when not logged in Right Side Controls signin and register */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-widest">
                    <Link to="/login">
                      <button className="hover:text-[#b1a494] transition-colors">
                        Sign In
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="bg-[#b1a494] px-5 py-2 rounded-sm transition-all">
                        Sign Up
                      </button>
                    </Link>
                  </div>

                  {/* Hamburger Button for SM and MD */}
                  <div
                    className="flex xl:hidden flex-col gap-1.5 cursor-pointer"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <div className="w-8 h-[1px] bg-white"></div>
                    <div className="w-8 h-[1px] bg-white"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* --- MOBILE/TABLET SIDE DRAWER --- */}
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[110] transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Content */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[350px] bg-[#1e2d35] z-[120] p-8 flex flex-col transition-transform duration-500 ease-in-out lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center italic font-serif text-white">
              C
            </div>
            <div className="flex flex-col leading-none text-white">
              <span className="text-lg font-serif uppercase tracking-tight">
                Carmelína
              </span>
              <span className="text-[5px] uppercase tracking-[0.1em] opacity-60 text-white">
                Hotel Booking & Resort
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-white text-2xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Drawer Menu Links */}
        <ul className="flex flex-col gap-6 flex-grow">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="flex justify-between items-center text-white/90 text-sm font-sans tracking-widest uppercase cursor-pointer hover:text-[#b1a494] transition-colors"
            >
              {item.name}
              {item.hasSub && <span className="text-[10px] opacity-40">▼</span>}
            </li>
          ))}
        </ul>

        {/* Drawer Footer: Contact & Socials */}
        <div className="mt-auto pt-8 border-t border-white/10">
          <h4 className="text-white text-lg font-serif mb-4 uppercase tracking-widest">
            Contact
          </h4>
          <p className="text-white/60 text-xs font-sans leading-relaxed mb-6">
            3949 State 38b Rte Newark Valley,
            <br />
            New York(NY), 13811
          </p>
          <div className="flex gap-4">
            {["f", "t", "ig", "m"].map((social) => (
              <div
                key={social}
                className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-white text-[10px] uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                {social}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
