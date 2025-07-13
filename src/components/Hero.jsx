import { useState, useEffect } from "react";
import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ITHAbi, ITHAddress } from "./contract/ITH";
import { tokenAddress, tokenAbi } from "./contract/Token";
import { usdtAddress, btcAddress, usdtAbi } from "./contract/Usdt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";

function Hero({ cryptoPrices }) {
  useFadeInObserver();

  const { address: account, chainId } = useWeb3ModalAccount();
  const isBSC = chainId === 56;
  const [scrollPosition, setScrollPosition] = useState(0);

  const [USD, setUSD] = useState(0);
  const [ETH, setETH] = useState(0);
  const [BTC, setBTC] = useState(0);
  const [etherAmount, setEtherAmount] = useState("");
  const [tokenAmountETH, setTokenAmountETH] = useState(null);
  const [tokenAmountUSDT, setTokenAmountUSDT] = useState(null);
  const [tokenAmountWBTC, setTokenAmountWBTC] = useState(null);
  const [crunetPrice, setCrunetPrice] = useState(0);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  let a = "0";
  useEffect(() => {
    const getLatestPriceETHPerUSD = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(ITHAbi, ITHAddress);

        const responses2 = await financeAppTokenOf.methods
          .getLatestPriceUSDTPerUSD()
          .call();
        const responses3 = await financeAppTokenOf.methods
          .getLatestPriceusdcPerUSD()
          .call();

        // const get = Number(responses) / 1e18;
        const get2 = Number(responses2) / 1e18;
        const get3 = Number(responses3) / 1e18;
        console.log("getLatestPriceUSDCPerUSD", get2.toFixed());
        console.log("getLatestPriceWBTCPerUSD", get3.toFixed());
        // setETH(get);
        setUSD(get2);
        setBTC(get3);
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
      }
    };
    if (account && isBSC) {
      getLatestPriceETHPerUSD();
    }
  }, [account, isBSC]);

  const [owner, setOwner] = useState("");

  useEffect(() => {
    // Automatically fetch rounded price details when account or network status changes
    const fetchRoundedPriceDetails = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(ITHAbi, ITHAddress);

        const owner = await financeAppTokenOf.methods
          .owner()
          .call({ from: account });
        setOwner(owner);

        console.log("Response from owner:", owner);
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
        setErrorMessage(
          "Error fetching rounded price details. Please try again."
        );
      }
    };

    if (account && isBSC) {
      fetchRoundedPriceDetails();
    }
  }, [account, isBSC]);
  const [referralAddress, setReferralAddress] = useState("");
  const defaultReferralAddress = owner;
  // console.log("referralAddress",referralAddress) // Replace with actual default referral address

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refAddress = urlParams.get("ref");
    setReferralAddress(refAddress || defaultReferralAddress);
  });

  // console.log("referralAddress",referralAddress)
  const [usdt, setUsdt] = useState();
  const [wbtc, setWbtc] = useState();
  useEffect(() => {
    const Address = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(ITHAbi, ITHAddress);

        const usdt = await financeAppTokenOf.methods.usdtToken().call();
        const wbtc = await financeAppTokenOf.methods.usdcToken().call();
        setUsdt(usdt);
        setWbtc(wbtc);
        console.log("usdt", usdt, "usdc", wbtc);
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
      }
    };
    if (account && isBSC) {
      Address();
    }
  }, [account, isBSC]);
  useEffect(() => {
    const currentRound = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(ITHAbi, ITHAddress);

        const responses = await financeAppTokenOf.methods.currentRound().call();

        const price = responses.priceUSD;

        const get = Number(price) / 1e18;
        console.log("get", get);
        setCrunetPrice(get);
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
      }
    };
    if (account && isBSC) {
      currentRound();
    }
  }, [account, isBSC]);

  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [unixTime, setUnixTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  useEffect(() => {
    // Automatically fetch rounded price details when account or network status changes
    const fetchRoundedPriceDetails = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(ITHAbi, ITHAddress);

        const response = await financeAppTokenOf.methods.currentRound().call();

        const price = Number(response.priceUSD);
        const duration = Number(response.duration);
        const startTime = Number(response.startTime);

        const adjustedPrice = parseFloat(price) / Math.pow(10, 18);
        const finalPrice = adjustedPrice;

        setPrice(finalPrice);
        setDuration(duration);
        setStartTime(startTime);

        const uni = parseInt(duration, 10) + parseInt(startTime, 10);
        setUnixTime(uni);
        console.log("Placing time (Unix):", uni);
        console.log("Start time:", startTime);

        console.log("Response from currentRound:", account);

        console.log("Price type:", typeof price, "Value:", price);
        console.log("Duration type:", typeof duration, "Value:", duration);
        console.log("StartTime type:", typeof startTime, "Value:", startTime);
        // console.log("StartTime typeeeeeeee:", rounded);

        // console.log("StartTime adjustedPrice:", adjustedPrice);
        // if (isNaN(adjustedPrice)) {
        //   throw new Error("Invalid price value");
        // }
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
        // setErrorMessage(
        //   "Error fetching rounded price details. Please try again."
        // );
      }
    };

    console.log("Fetching rounded price details:", price, duration, startTime);

    if (account && isBSC) {
      fetchRoundedPriceDetails();
    }
  }, [account, isBSC]);

  useEffect(() => {
    if (unixTime) {
      // Calculate the remaining time every second
      const intervalId = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const timeLefts = unixTime - currentTime; // Calculate remaining time
        setRemainingTime(timeLefts > 0 ? timeLefts : 0); // Ensure it doesn't go negative
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [unixTime]);

  // Convert remaining time to days, hours, minutes, and seconds
  const formatTime = (time) => {
    const days = Math.floor(time / 86400); // 86400 seconds in a day
    const hours = Math.floor((time % 86400) / 3600); // Remaining hours
    const minutes = Math.floor((time % 3600) / 60); // Remaining minutes
    const seconds = time % 60; // Remaining seconds
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(remainingTime);
  // console.log("days, hours, minutes, seconds ", days, hours, minutes, seconds);
  const [solSelect, setSolSelect] = useState(false);

  const [selectedSol, setSelectedSol] = useState("USDT");

  const solOptions = [
    { name: "USDT", price: 1, price2: tokenAmountUSDT, ABI: usdt },
    { name: "USDC", price: 1, price2: tokenAmountWBTC, ABI: wbtc },
  ];

  // const solOptions = [
  //   { name: "USDT", price: USD, price2: tokenAmountUSDT, ABI: usdt },
  //   { name: "USDC", price: BTC, price2: tokenAmountWBTC, ABI: wbtc },
  // ];

  const calculateIthTokens = () => {
    const selectedCrypto = solOptions.find((opt) => opt.name === selectedSol);

    if (!selectedCrypto) {
      return 0;
    }

    const selectedCryptoPrice = selectedCrypto.price2 || 0;

    // Calculate how many ITH tokens can be bought
    const ithTokens = selectedCryptoPrice;

    return ithTokens.toFixed();
  };

  const getSelectedCryptoAddress = () => {
    const selectedCrypto = solOptions.find((opt) => opt.name === selectedSol);

    return selectedCrypto?.ABI || "Address not found";
  };
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ITHAbi, ITHAddress);

  const handleInputChange = (event) => {
    const amount = event.target.value;
    setEtherAmount(amount); // Update the state with the input value
  };

  const fetchTokenAmounts = async () => {
    try {
      const weiAmount =
        etherAmount && etherAmount.trim() !== ""
          ? web3.utils.toWei(etherAmount, "ether")
          : "0"; // Fallback to "0" if the input is empty or whitespace

      const [amountUSDT, amountWBTC] = await Promise.all([
        // contract.methods.getTokenAmountETH(weiAmount).call(),
        contract.methods.getTokenAmountUSDT(weiAmount).call(),
        contract.methods.getTokenAmountusdc(weiAmount).call(),
      ]);

      setTokenAmountUSDT(Number(amountUSDT) / 1e18);
      setTokenAmountWBTC(Number(amountWBTC) / 1e18);

      console.log("tokenAmountUSDT", Number(amountUSDT) / 1e18);
      console.log("tokenAmountWBTC", Number(amountWBTC) / 1e18);
    } catch (error) {
      console.error("Error fetching token amounts:", error);
    }
  };

  // Placeholder management and token fetching
  useEffect(() => {
    if (etherAmount !== undefined) {
      fetchTokenAmounts();
    }
  }, [etherAmount]);

  const [targetAmounts, setTargetAmount] = useState(50000);
  const [risingData, setRisingData] = useState(1);
  const [risingPrice, setRisingPrice] = useState(480);
  const [currentAmount] = useState(risingData); // Example current amount
  const totalAmount = targetAmounts;

  useEffect(() => {
    const targetAmountUSD = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(ITHAbi, ITHAddress);

        const responses = await financeAppTokenOf.methods
          .targetAmountUSD()
          .call();
        const rising = await financeAppTokenOf.methods.totalRaised().call();

        const amountAsNumber = parseFloat(responses) / Math.pow(10, 18);
        const roundedvalue = (amountAsNumber).toFixed();
        const amountRising = Number(rising) / Math.pow(10, 18);
        const amountRisingPercentage = (
          (amountRising / amountAsNumber) *
          100
        ).toFixed();

        console.log("risingData rounded price details:", roundedvalue);
        setTargetAmount(roundedvalue);
        setRisingPrice(amountRising);
        setRisingData(amountRisingPercentage);
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
      }
    };

    if (account && isBSC) {
      targetAmountUSD();
    }
  }, [account, isBSC, transactionSuccess]);

  const [loading, setLoading] = useState(false); // State to manage loader visibility

  const handleCryptoSelection = async () => {
    const selectedCrypto = solOptions.find((opt) => opt.name === selectedSol);
    if (!selectedCrypto) return;

    const cryptoAmount = selectedCrypto.price2;
    const cryptoAddress = selectedCrypto.ABI;

    console.log("cryptoAddress", cryptoAddress);
    try {
      if (etherAmount > 0) {
        setLoading(true); // Start loader

        if (selectedSol === "USDC" || selectedSol === "USDT") {
          // Approve function first
          console.log(`Approving ${selectedSol} amount: ${cryptoAmount}`);

          const approveToken = new web3.eth.Contract(tokenAbi, cryptoAddress);
          const amountInWei = web3.utils.toWei(etherAmount, "ether");

          await approveToken.methods
            .approve(ITHAddress, amountInWei)
            .send({ from: account, value: a });

          // Buy function after approval
          console.log(`Buying with ${selectedSol} amount: ${cryptoAmount}`);
          const contract = new web3.eth.Contract(ITHAbi, ITHAddress);

          await contract.methods
            .buyTokens(amountInWei, cryptoAddress, referralAddress)
            .send({ from: account, value: a });
        }
        //   else if (selectedSol === "BNB") {
        //     // Directly call buy function for ETH
        //     console.log(`Directly buying with ETH amount: ${cryptoAmount}`);
        //     const contract = new web3.eth.Contract(ITHAbi, ITHAddress);
        //     const amountInWei = web3.utils.toWei(etherAmount, "ether");

        //     await contract.methods
        //       .buyTokens(amountInWei, cryptoAddress, referralAddress)
        //       .send({ from: account, value: amountInWei });
        //   }

        //   toast.success("Transaction successful!");
        //   setEtherAmount("");
        //   setTransactionSuccess((prev) => !prev);
        // } else {
        toast.warning("Enter The Amount");
      }
    } catch (error) {
      console.error(`Error processing ${selectedSol}:`, error);
      toast.error(`Error processing ${selectedSol}: ${error.message}`);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2025-08-02T08:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // If the date has passed, set timeLeft to zero
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Format the time values to be two digits
    timeLeft.hours = String(timeLeft.hours).padStart(2, "0");
    timeLeft.minutes = String(timeLeft.minutes).padStart(2, "0");
    timeLeft.seconds = String(timeLeft.seconds).padStart(2, "0");

    return timeLeft;
  }

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress to final value
    const animateProgress = () => {
      const targetProgress = (currentAmount / totalAmount) * 100;
      let currentProgress = 0;

      const updateProgress = () => {
        if (currentProgress < targetProgress) {
          currentProgress += 1;
          setProgress(currentProgress);
          requestAnimationFrame(updateProgress);
        }
      };

      requestAnimationFrame(updateProgress);
    };

    animateProgress();
  }, [currentAmount, totalAmount]);

  return (
    <>
      <ToastContainer />
      <section id="hero">
        <div className="flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 relative">
            <div className="text-center flex flex-column justify-content-center">
              <img
                src="/images/icon _coin_.svg"
                alt="qdo coin"
                width={"34"}
                height={"34"}
                loading="eager"
              />
              <h1 className="text-4xl font-bold mb-6 mt-6 hero-h1 fade">
                $QDV TOKEN SALE
              </h1>
              <div className="flex justify-center space-x-2 text-sm font-semibold mb-12 text-white fade">
                <div className="text-center">
                  <p className="font-lighter" style={{ opacity: "0.14" }}>
                    Days
                  </p>
                  <p className="text-7xl font-normal mt-1">{timeLeft.days}</p>
                </div>
                <div className="text-center align-self-end">
                  <p className="text-7xl">:</p>
                </div>
                <div className="text-center">
                  <p className="font-lighter" style={{ opacity: "0.14" }}>
                    Hours
                  </p>
                  <p className="text-7xl font-normal mt-1">{timeLeft.hours}</p>
                </div>
                <div className="text-center align-self-end">
                  <p className="text-7xl">:</p>
                </div>
                <div className="text-center">
                  <p className="font-lighter" style={{ opacity: "0.14" }}>
                    Minutes
                  </p>
                  <p className="text-7xl font-normal mt-1">
                    {timeLeft.minutes}
                  </p>
                </div>
                <div className="text-center align-self-end">
                  <p className="text-7xl">:</p>
                </div>
                <div className="text-center">
                  <p className="font-lighter" style={{ opacity: "0.14" }}>
                    Seconds
                  </p>
                  <p className="text-7xl font-normal mt-1">
                    {timeLeft.seconds}
                  </p>
                </div>
              </div>
            </div>
            <div className="hero-bg-gradient p-6 md:p-10 lg:p-20 rounded-lg mt-16 w-full mx-auto fade">
              <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-8 gap-20">
                <div className="w-full md:w-1/2">
                  <h2 className="text-5xl font-lighter mb-12">
                    Rev up your Earnings <br /> with{" "}
                    <span className="text-purple-500 text-gold font-normal">
                      QDVI
                    </span>
                  </h2>
                  <p className="mb-4 text-gray">
                    <strong className="font-semibold text-2xl">
                      Safe, easy & secure.
                    </strong>
                    <br />
                    You can purchase <strong>$QDV</strong> token by clicking on
                    the "<span className="text-underline">Buy with...</span>"
                    button or with connected wallet, which will take you to a
                    secure payment page.
                  </p>
                  <p className="mb-4 text-gray">
                    Enter the amount you wish to purchase and complete the
                    payment process. Once confirmed, your tokens will be added
                    to your wallet.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <strong
                    className="text-center mb-4 goal-text"
                    style={{ color: "#C7B77B" }}
                  >
                    $QDV Goal
                  </strong>
                  <div className="bg-black p-6 rounded-full flex items-center justify-between mb-8 relative overflow-hidden fade">
                    <div
                      className="absolute inset-0 bg-yellow-600"
                      style={{
                        width: `${risingData}%`,
                        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother easing
                        backgroundImage: `linear-gradient(351deg, 
        #1F271F -10.48%, 
        #718D71 ${risingData}%`, // Gradient effect
                      }}
                    />
                    <span className="relative z-10 text-white">
                      {risingPrice}$ / {targetAmounts}$
                    </span>
                    <span className="relative z-10 text-white">
                      {risingData}%
                    </span>
                  </div>
                  <div className="heroinput">
                    <input
                      type="number"
                      value={etherAmount}
                      onChange={handleInputChange}
                      placeholder={`Enter Amount ${selectedSol}`}
                      color="black"
                    />
                  </div>
                  <div
                    className="flex flex-col md:grid md:grid-cols-2 gap-4 mb-4"
                    style={{ zIndex: "1" }}
                  >
                    {/* SOL Dropdown */}
                    <div
                      className="bg-transparent border border-white p-5 rounded-full flex items-center justify-between w-full cursor-pointer relative"
                      onClick={() => {
                        setSolSelect(!solSelect);
                        // setIthSelect(false);
                      }}
                    >
                      <div className="flex items-center space-x-2 w-full">
                        <span className="text-white font-semibold">
                          {selectedSol}{" "}
                          <i className="fa fa-chevron-right ms-2"></i>
                        </span>
                      </div>
                      <span className="text-white">
                        $
                        {solOptions
                          .find((opt) => opt.name === selectedSol)
                          ?.price.toFixed()}
                      </span>

                      {solSelect && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#718D71] border border-white rounded-xl shadow-lg z-20 overflow-hidden">
                          {solOptions.map((option) => (
                            <div
                              key={option.name}
                              className="px-6 py-3 hover:bg-[#1F271F] transition duration-300 text-white flex justify-between"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSol(option.name);
                                setSolSelect(false);
                              }}
                            >
                              <span>{option.name}</span>
                              <span>${option.price.toFixed()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ITH Dropdown */}
                    <div
                      className="bg-transparent border border-white p-5 rounded-full flex items-center justify-between w-full relative"
                      onClick={() => {
                        // setIthSelect(!ithSelect);
                        setSolSelect(false);
                      }}
                    >
                      <div className="flex items-center space-x-2 w-full">
                        <span className="text-white font-semibold">QDV</span>
                      </div>
                      <span
                        className="text-white"
                        style={{ marginTop: "-14px" }}
                      >
                        <span className="relative">
                          $ {calculateIthTokens()}
                          <span
                            className="text-sm ml-2 font-regular text-gray-200 absolute"
                            style={{ right: "0", bottom: "-14px" }}
                          >
                            {/* Price: $ {crunetPrice} */}
                            Price: $0.00066667
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <button
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-5 px-2 rounded-full text-lg  w-full md:w-1/2 gradient-button-3 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center fade"
                      onClick={handleCryptoSelection}
                      disabled={loading}
                    >
                      {loading ? (
                        "Processing..."
                      ) : (
                        <p>
                          Pucharse with <strong> {selectedSol}</strong>
                        </p>
                      )}
                    </button>
                    {/* <a
                    href="#"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-5 px-2 rounded-full text-lg  w-full md:w-1/2 gradient-button-3 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center fade"
                  >
                    Connect Wallet <i className="fas fa-arrow-right ms-4"></i>
                  </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
}

export default Hero;
