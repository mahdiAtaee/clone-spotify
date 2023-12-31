import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'

import { links } from '../assets/constants'

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        className="flex flex-row justify-start items-center my-8 font-medium text-gray-400 hover:text-cyan-400"
        onClick={handleClick && handleClick()}>
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] px-4 bg-[#191624]">
        {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
        <h3 className="font-bold text-white w-full h-14 pt-10 text-2xl">MUSICICAL</h3>
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-4 right-6 z-10">
        {openMenu ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setOpenMenu(false)} />
        ) : (
          <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setOpenMenu(true)} />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          openMenu ? 'left-0' : '-left-full'
        }`}>
        {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
        <NavLinks />
      </div>
    </>
  )
}

export default Sidebar
