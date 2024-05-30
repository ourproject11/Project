import React, { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen , setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <header>
     <nav>
        <a href= "/" className= "flex items-center gap-2 text-2xl" >
        <img 
        src="/images/file.png" 
        width="29" 
        height="30" 
        alt="Icon description"
        />
    <span>Talent Track</span>
    </a>
    </nav> 
    </header>
  );
};

export default Navbar;
