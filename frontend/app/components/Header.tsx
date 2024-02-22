import React from 'react';
import localFont from "@next/font/local"

const against = localFont({
  src: "../../public/fonts/Against.ttf",
  variable: "--Against",
})


const isLoggedIn = false;
const Header = ({bgImage}: {bgImage: string}) => {
  return (
    <div className={`${against.className}`} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <nav className=" text-bt-peach flex justify-end">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Home</a>
                <a href="/about" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">About</a>
                <a href="/contact" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Contact</a>
                {isLoggedIn ? (
                    <a href="/" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Logout</a>
                ) : (
                  <>
                  <a href="/login" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Login</a>
                  <a href="/signup" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Signup</a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div className='w-full h-[60vh] flex items-center justify-center flex-col'>
      <p className='text-7xl mb-4 text-center text-white'>HaalSamachar</p>
      <p className='text-xl text-center text-white'>Just to keep a check on your HaalSamachar</p>
    </div>
    </div>
  );
};

export default Header;
