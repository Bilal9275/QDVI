import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function Banner2() {
  useFadeInObserver();
  return (
    <section id="banner-2">
      <div className="flex flex-col items-center pb-16 pt-24 px-4">
        <h1 className="text-5xl font-bold mb-16 text-center fade">How it works?</h1>
        <div className="bg-gradient-to-r from-[#101735] to-[#8238e4] rounded-lg px-10 flex flex-col md:flex-row items-center max-w-[1320px] w-full relative">
          <div className="md:w-1/2 w-full mb-8 md:mb-0 py-8">
            <h2 className="text-4xl font-bold mb-6 fade">InTheHouse App</h2>
            <p className="mb-4 fade">
              InTheHouse is an innovative mobile application that allows users
              to easily and conveniently order cleaning services for apartments
              and houses. This intuitive platform enables users to find
              professional cleaners who will provide them with clean and tidy
              interiors, tailored to their individual needs.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 fade">
              <li className="flex items-start">
                <i className="fas fa-check text-blue-600 mr-2 mt-1"></i>
                <strong>
                  Easily find professional cleaners tailored to your needs.
                </strong>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-blue-600 mr-2 mt-1"></i>
                <strong>
                  Conveniently schedule cleaning services at your convenience.
                </strong>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-blue-600 mr-2 mt-1"></i>
                <strong>
                  {" "}
                  Sit back and relax while your space gets spotless.
                </strong>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-blue-600 mr-2 mt-1"></i>
                <strong>
                  Either hire cleaning professionals or offer your own services
                  through the app.
                </strong>
              </li>
            </ul>
            <div className="mt-8 flex gap-2 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 fade">
              <a
                href="https://apps.apple.com/pl/app/inthehouse/id6443443193"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-bold py-6 px-6 rounded-full text-lg w-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center"
              >
                <span className="me-2">App Store</span>{" "}
                <i className="fas fa-arrow-right"></i>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.adawards.inthehouse"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-bold py-6 px-6 rounded-full text-lg w-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center"
              >
                <span className="me-2">Google Play </span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div
            className="md:w-1/2 w-full flex justify-end relative ith-app fade"
            style={{ top: "-40px" }}
          >
            <img src="/images/banner2.png" alt="Mobile app screenshot" />
          </div>
          <img
            src="/images/ithcoin.png"
            alt="ITH Coin"
            loading="lazy"
            width={"99"}
            height={"105"}
            className="ith-coin ith-coin-1-1"
          />
          <img
            src="/images/ithcoin.png"
            alt="ITH Coin"
            loading="lazy"
            width={"158"}
            height={"163"}
            className="ith-coin ith-coin-2-1"
          />
          <img
            src="/images/ithcoin.png"
            alt="ITH Coin"
            loading="lazy"
            width={"102"}
            height={"102"}
            className="ith-coin ith-coin-3-1"
          />
          <img
            src="/images/ithcoin.png"
            alt="ITH Coin"
            loading="lazy"
            width={"99"}
            height={"105"}
            className="ith-coin ith-coin-4-1"
          />
        </div>
      </div>
    </section>
  );
}

export default Banner2;
