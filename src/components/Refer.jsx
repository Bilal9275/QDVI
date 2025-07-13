import { useEffect, useState, useRef } from "react";
import "../App.css";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useFadeInObserver } from "../hooks/useFadeInObserver";
import { ITHAbi, ITHAddress } from "./contract/ITH";
import { tokenAddress, tokenAbi } from "./contract/Token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";

function Refer() {
  useFadeInObserver();

  const [referralCode, setReferralCode] = useState("");
  const imgRef = useRef(null);ToastContainer
  const referralCodeRef = useRef(null);
  const [owner, setOwner] = useState("");
  const { address: account, chainId } = useWeb3ModalAccount();
  const isBSC = chainId === 97;
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
      
      }
    };


    if (account && isBSC) {
      fetchRoundedPriceDetails();
    }
  }, [account, isBSC]);

  const [referralAddress, setReferralAddress] = useState("");
  const defaultReferralAddress = owner;
  console.log("referralAddress",referralAddress) // Replace with actual default referral address


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refAddress = urlParams.get("ref");
    setReferralAddress(refAddress || defaultReferralAddress);
  });

  const [investment, setInvestment] = useState();

  useEffect(() => {
    let interval;

    const roundedNo = async () => {
      if (!account || !isBSC) {
        console.log("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);

        const financeAppTokenOf = new web3.eth.Contract(ITHAbi, ITHAddress);
        const getUserData = await financeAppTokenOf.methods
          .getUserData(account,[tokenAddress])
          .call();

        const investment = Number(getUserData.investment) / 1e18;
      

        setInvestment(investment);
        // console.log("investment",investment)
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
       
      }
    };

    if (account && isBSC) {
      roundedNo(); // Call immediately
      interval = setInterval(roundedNo, 5000); // Repeat every 1 second
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup on unmount
    };
  }, [account, isBSC]);

  const [link, setLink] = useState("");
  
  // Generate Referral Link
  const generateReferralLink = () => {
    if (investment > 0) {
//       const firstFour = account.substring(0, 4); // Get the first 4 digits
// const lastFour = account.slice(-4); 
      setLink(`${window.location.origin}?ref=${account}`);
      console.log(
        " generating a referral link.",link
      );
      return link;
    } else {
      toast.warning(
        "You need to complete a purchase before generating a referral link."
      );
      return null;
    }
  };


  

  const copyReferralCode = () => {
    if (referralCodeRef.current) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          alert("Referral code copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <>
    <ToastContainer/>
    <section id="refer">
      <div className="refer-bg">
        <div className="container mx-auto">
          <div className="text-white py-10 px-4 w-full flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-3xl mb-1 fade text-yellow">
                Start investing with QDVI now!
              </h3>
              <p>
                Refer a friend and receive free <strong>$QDV</strong>
              </p>
            </div>
            <div  className="flex flex-col md:flex-row items-center justify-end space-y-4 refer-full md:space-y-0 md:space-x-4">
              <button
              style={{overflow:"hidden"}}
                className="bg-transparent border border-white rounded-full py-4 px-6 w-full rounded fade transition duration-300 transform hover:scale-105 text-center h-100 refer-btn"
                onClick={copyReferralCode}
                ref={referralCodeRef}
              >
                {link || "Click the button to generate code..."}
              </button>
              <button
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 text-lg gradient-button-2 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center fade"
                onClick={generateReferralLink}
              >
                Generate Code <i className="fas fa-arrow-right ml-2 ms-10"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section></>
  );
}

export default Refer;
