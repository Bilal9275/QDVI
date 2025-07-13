import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import axios from "axios";

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import UnderHero from "./components/UnderHero.jsx";
import Steps from "./components/Steps.jsx";
import FAQ from "./components/FAQ.jsx";
import Footer from "./components/Footer.jsx";
import Formular from "./components/Form.jsx";
import Refer from "./components/Refer.jsx";
import Chart from "./components/Chart.jsx";
import Benefits from "./components/Benefits.jsx";
import Vizualizations from "./components/Vizualizations.jsx";
import Subpage from "./Subpage.jsx"; // Import the Subpage component

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cryptoPrices, setCryptoPrices] = useState({
    SOL: 21.229,
    USDT: 1.001,
    ETH: 35.678,
    BTC: 52.345,
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch crypto prices
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana,tether,ethereum,bitcoin&vs_currencies=usd"
        );

        const prices = {
          SOL: response.data.solana.usd,
          USDT: response.data.tether.usd,
          ETH: response.data.ethereum.usd,
          BTC: response.data.bitcoin.usd,
        };

        setCryptoPrices(prices);

        // Add any initial data fetching or resource loading here
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
      } catch (error) {
        console.error("Content loading error:", error);
        // Keep default prices if API fails
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-50 bg-[#000] flex items-center justify-center animate-loading-screen"
        style={{
          animation: "fadeOutLoading 2s ease-in-out forwards",
          animationDelay: "2s",
        }}
      >
        <strong
          className="text-7xl font-bold text-white animate-loading-title text-gold"
          style={{
            animation: "moveTitle 2s ease-in-out forwards",
            opacity: 1,
          }}
        >
          Quality Development
        </strong>
      </div>
    );
  }

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero cryptoPrices={cryptoPrices} />
                <Refer />
                <UnderHero />
                <Benefits />
                <Vizualizations />
                <Chart />
                <Steps />
                <FAQ />
                <Formular />
              </>
            }
          />
          <Route
            path="/token-staking"
            element={
              <>
                <Subpage />
                <Refer />
              </>
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
