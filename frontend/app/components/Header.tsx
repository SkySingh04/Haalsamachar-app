"use client";
import React, { useEffect, useState } from "react";
import localFont from "@next/font/local";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const against = localFont({
  src: "../../public/fonts/Against.ttf",
  variable: "--Against",
});

const Header = ({
  bgImage,
  heading,
  subheading,
}: {
  bgImage: string;
  heading: string;
  subheading: string;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        console.log("Logged out successfully!");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        toast.error("Failed to logout");
        console.error("Error:", error);
      });
  };

  return (
    <div
      className={`${against.className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className=" text-bt-peach flex justify-end">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-16">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/"
                    className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]"
                  >
                    Home
                  </a>
                  <a
                    href="/about"
                    className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]"
                  >
                    About
                  </a>
                  <a
                    href="/contact"
                    className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]"
                  >
                    Contact
                  </a>

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]"
                      >
                        Signup
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full h-[60vh] flex items-center justify-center flex-col">
        <p className="text-7xl mb-4 text-center text-white">{heading}</p>
        <p className="text-xl text-center text-white">{subheading}</p>
      </div>
    </div>
  );
};

export default Header;
