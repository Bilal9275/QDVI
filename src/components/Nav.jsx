import { useState, useEffect, useRef } from "react";
import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";
import { Link } from "react-router-dom";
import WalletConnection from "./WalletConnection";

function Nav() {
  useFadeInObserver();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const navHeight = navRef.current?.offsetHeight || 0;
    document.querySelector("main").style.marginTop = `${navHeight}px`;
  }, []);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav ref={navRef} className={`bg-[#000] w-full fixed top-0 left-0 z-50`}>
      <div className="container mx-auto max-w-[1320px] flex items-center justify-between p-4 py-6">
        <div className="flex items-center">
          <Link to="/" className="logo fade">
            <img
              src="/images/qdovalogo.png"
              alt="Logo"
              width={"auto"}
              height={"64"}
            />
          </Link>
        </div>
        <div className="flex items-center space-x-8 text-white text-lg">
          <div className="hidden lg:flex space-x-8 fade">
            <Link
              to="/#"
              className="hover:text-gray-400 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/#hero"
              className="hover:text-gray-400 transition duration-300"
            >
              Buy
            </Link>
            <Link
              to="/token-staking"
              className="hover:text-gray-400 transition duration-300"
            >
              Staking
            </Link>
            <Link
              to="/#under-hero"
              className="hover:text-gray-400 transition duration-300"
            >
              About Project
            </Link>
            <a
              href="https://qudova-1.gitbook.io/qudova_whitepaper-v0.1"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhitePaper
            </a>
            <Link
              to="/#chart"
              className="hover:text-gray-400 transition duration-300"
            >
              Tokenomics
            </Link>
            <Link
              to="/#steps"
              className="hover:text-gray-400 transition duration-300"
            >
              Roadmap
            </Link>
            <Link
              to="/#faq"
              className="hover:text-gray-400 transition duration-300"
            >
              Contact
            </Link>
          </div>
          <div className="hidden lg:block fade">
            <WalletConnection />
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none hamburger ${isOpen ? "open" : ""}`}
            >
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`mobile-menu lg:hidden ${
          isOpen ? "max-h-screen h-screen" : "max-h-0 h-0"
        }`}
      >
        <div className="flex flex-col items-center mt-4 space-y-6 text-white text-lg animate__animated animate__fadeIn mx-6">
          <Link
            to="/#"
            onClick={closeMobileMenu}
            className="block hover:text-gray-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/#hero"
            onClick={closeMobileMenu}
            className="block hover:text-gray-400 transition duration-300"
          >
            Buy
          </Link>
          <Link
            to="/token-staking"
            onClick={closeMobileMenu}
            className="block hover:text-gray-400 transition duration-300"
          >
            Staking
          </Link>
          <Link
            to="/#under-hero"
            onClick={closeMobileMenu}
            className="block hover:text-gray-400 transition duration-300"
          >
            About Project
          </Link>
          <a
            href="https://qudova-1.gitbook.io/qudova_whitepaper-v0.1"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhitePaper
          </a>
          <Link
            to="/#chart"
            onClick={closeMobileMenu}
            className="block hover:text-gray-400 transition duration-300"
          >
            Tokenomics
          </Link>
          <Link
            to="/#steps"
            onClick={closeMobileMenu}
            className="block hover:text-gray-400 transition duration-300"
          >
            Roadmap
          </Link>
          <Link
            to="/#faq"
            onClick={closeMobileMenu}
            className="block hover:text-gray-400 transition duration-300"
          >
            Contact
          </Link>
          <a to="#hero" onClick={closeMobileMenu} className="flex items-center">
            <WalletConnection />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
