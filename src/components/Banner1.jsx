import "../App.css";
import { useState } from "react";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function Banner1() {
  useFadeInObserver();
  const [isBlurred, setIsBlurred] = useState(true);

  const toggleImage = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <section id="banner-1">
      <div className="flex items-center justify-center pt-6">
        <div
          className="p-10 rounded-3xl grid md:grid-cols-2 gap-10 container place-items-center"
          style={{
            background: "linear-gradient(to right, #101735, #8238e4)",
          }}
        >
          <div className="space-y-10 w-full">
            <div className="fade">
              <h2 className="text-[#fee785] text-3xl font-bold">
                NFT-based Loyalty Programs
              </h2>
              <p className="text-[#E5E5E5] mt-2">
                InTheHouse introduces innovative NFT-based loyalty programs that
                reward users with unique digital assets.
              </p>
            </div>
            <div className="fade">
              <h2 className="text-[#fee785] text-3xl font-bold">
                Smart Contract Automation
              </h2>
              <p className="text-[#E5E5E5] mt-2">
                Our smart contracts automatically execute agreements between
                clients and service providers, guaranteeing timely payments and
                fulfillment of service conditions.
              </p>
            </div>
            <div className="fade">
              <h2 className="text-[#fee785] text-3xl font-bold">
                Blockchain integration
              </h2>
              <p className="text-[#E5E5E5] mt-2">
                InTheHouse leverages blockchain technology to ensure
                transparency, security, and efficiency in all transactions.
              </p>
            </div>
          </div>
          <div
            className="w-full h-full bg-[#1A1D2E] rounded-3xl flex items-center justify-center relative banner1-img cursor-pointer fade"
            onClick={toggleImage}
          >
            <img
              src={
                isBlurred
                  ? "/images/banner1.png"
                  : "/images/banner1unblured.png"
              }
              alt="Background image"
              className={`absolute inset-0 w-full h-full object-cover ${
                isBlurred ? "blur-md" : ""
              }`}
            />
            {isBlurred && (
              <span className="text-6xl text-white relative z-10">?</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner1;
