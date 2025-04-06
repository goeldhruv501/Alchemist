import { Link } from 'react-router-dom'
import DropDownMenu from './DropDownMenu'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDashboardClick = () => {
    const token = sessionStorage.getItem("AcessToken")
    if (token) {
      window.open(
        "https://mixolydian-neptune-51b.notion.site/Home-Page-1cb319b6085380bfb98cfc74dc970a94",
        "_blank"
      )
    } else {
      window.location.href = "/login"
    }
  }

  return (
    <div>
      <nav className='bg-[#1c1c1e] text-[#f5f5f5] shadow-md flex justify-between items-center py-4 px-6 md:px-12 transition-all duration-300 z-50 relative'>

        {/* Logo */}
        <div className='text-[#f5f5f5] text-2xl font-bold tracking-wide hover:scale-105 transition duration-300 ease-in-out'>
          <Link to="/">ALCHEMIST</Link>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-6 uppercase text-[#f5f5f5] text-lg font-medium items-center'>
          <li className='relative group transition duration-300 ease-in-out'>
            <Link to="/NewArrivals" className='hover:text-[#e94560] transition duration-300'>
              About
            </Link>
            <div className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#e94560] group-hover:w-full transition-all duration-300 ease-in-out'></div>
          </li>
        </ul>

        {/* Right Side */}
        <div className='flex gap-4 items-center'>

          <DropDownMenu />

          {/* Student Dashboard Button */}
          <button
            onClick={handleDashboardClick}
            className='hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white text-base px-5 py-2 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110'
          >
            Student Dashboard
          </button>

          {/* Get Started Button */}
          <a
            href="/canvas.html"
            target="_blank"
            rel="noopener noreferrer"
            className='hidden md:inline-block'
          >
            <button className='bg-[#e94560] hover:bg-[#b02a37] text-white text-base px-5 py-2 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110'>
              Get Started
            </button>
          </a>

          {/* Hamburger Icon */}
          <div className='md:hidden cursor-pointer text-[#f5f5f5] text-2xl' onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[68px] left-0 w-full bg-[#1c1c1e] text-[#f5f5f5] flex flex-col items-center gap-5 py-6 font-semibold text-lg shadow-md 
                transform transition-all duration-300 ease-in-out ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <Link
          to="/NewArrivals"
          onClick={() => setMenuOpen(false)}
          className='hover:text-[#e94560] transition duration-300 ease-in-out'
        >
          About
        </Link>

        <button
          onClick={() => {
            setMenuOpen(false);
            handleDashboardClick();
          }}
          className='hover:text-blue-400 transition duration-300 ease-in-out'
        >
          Student Dashboard
        </button>

        <a
          href="/canvas.html"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          <button className='bg-[#e94560] hover:bg-[#b02a37] text-white text-base px-5 py-2 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110'>
            Get Started
          </button>
        </a>
      </div>
    </div>
  )
}
