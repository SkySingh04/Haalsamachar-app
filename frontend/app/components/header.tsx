import React from 'react';


const isLoggedIn = false;
const Header = ({bgImage}: {bgImage: string}) => {
  return (
    <div className='' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <nav className=" text-bt-peach">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-end h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-bt-peach hover:bg-customGreen hover:text-black px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="/about" className="text-bt-peach hover:bg-customGreen hover:text-black px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="/contact" className="text-bt-peach hover:bg-customGreen hover:text-black px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                {isLoggedIn ? (
                    <a href="/" className="text-bt-peach hover:bg-customGreen hover:text-black px-3 py-2 rounded-md text-sm font-medium">Logout</a>
                ) : (
                  <>
                  <a href="/login" className="text-bt-peach hover:bg-customGreen hover:text-black px-3 py-2 rounded-md text-sm font-medium">Login</a>
                  <a href="/signup" className="text-bt-peach hover:bg-customGreen hover:text-black px-3 py-2 rounded-md text-sm font-medium">Signup</a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div className='w-full h-[60vh]   flex items-center justify-center'>
      <h1 className='text-4xl text-center text-white'>HaalSamachar</h1>
    </div>
    </div>
  );
};

export default Header;
