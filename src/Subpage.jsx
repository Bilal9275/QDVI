import { useState, useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { stakingAbi, stakingAddress } from "./components/contract/staking.jsx";
import { tokenAbi, tokenAddress } from "./components/contract/Token.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";
function Subpage() {
  const [isLoading, setIsLoading] = useState(true);
  const [rewardsBlock, setRewardsBlock] = useState("0");
  const [stakBalance, setStakBalance] = useState("0");
  const [pool, setPool] = useState("0");
  const [totalClaim, setTotalClaim] = useState("");
  const [balanceOf, setBalanceOf] = useState("");
  const [totalStakedBalance, setTotalStakedBalance] = useState("0");
  const [isStaked, setIsStaked] = useState(false);
  const { address: account, chainId } = useWeb3ModalAccount();
  const isBSC = chainId === 56;
 
    // Automatically fetch rounded price details when account or network status changes
    const rewardsBlocks = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(
          stakingAbi,
          stakingAddress
        );

        const rewardsBlock = await financeAppTokenOf.methods
          .rewardsPerBlock()
          .call();

        const rewardsper = Number(rewardsBlock);
        const reward = rewardsper / 1e18;
        setRewardsBlock(reward);
        console.log("rewardsBlock", reward);

        const totalStaked = await financeAppTokenOf.methods
          .totalStaked()
          .call();

        const totalStakedBalance = Number(totalStaked);
        const totalbal = totalStakedBalance / 1e18;
        setTotalStakedBalance(totalbal.toFixed());
        console.log("totalStakedBalance", totalStakedBalance);
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
      }
    };


  const getUserStats = async () => {
    if (!account || !isBSC) {
      setErrorMessage("Please connect to Binance Smart Chain Testnet.");
      return;
    }
  
    try {
      const web3 = new Web3(window.ethereum);
      const financeAppTokenOf = new web3.eth.Contract(
        stakingAbi,
        stakingAddress
      );
  
      const userStats = await financeAppTokenOf.methods
        .getUserStats(account)
        .call();
      
      let balance = Number(userStats.stakedBalance) / 1e18;
      setStakBalance(balance.toFixed());
      console.log("stakBalance", balance);
      
      let poolData = Number(userStats.poolPercentage) / 1e18;
      setPool(poolData);
      
      let claimData = Number(userStats.claimableRewards);
      setTotalClaim(claimData);
      console.log("totalClaim", totalClaim);
    } catch (error) {
      console.error("Error fetching rounded price details:", error);
    }
  };
  
  // useEffect to automatically fetch user stats on account or network change
  useEffect(() => {
    if (account && isBSC) {
      getUserStats();
      rewardsBlocks();
    }
  }, [account, isBSC]);
  useEffect(() => {
    // Automatically fetch rounded price details when account or network status changes
    const Stakeable = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(tokenAbi, tokenAddress);

        const balanceOff = await financeAppTokenOf.methods
          .balanceOf(account)
          .call();
        const balanceData = Number(balanceOff) / 1e18;
        setBalanceOf(balanceData.toFixed());
      } catch (error) {
        console.error("Error fetching rounded price details:", error);
      }
    };

    if (account && isBSC) {
      Stakeable();
    }
  }, [account, isBSC]);

  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const ChangeHandler = (event) => {
    const getAmount = event.target.value;
    setAmount(getAmount);
    console.log("amount", amount);
  };
  const ChangeHandlerMonth = (event) => {
    const getMonth = event.target.value;
    setMonth(getMonth);
  };
  // stake
  const staking = async () => {
    try {
      // Ensure Web3 is available
      if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
      }
  
      const web3 = new Web3(window.ethereum);
  
      const stakingContract = new web3.eth.Contract(stakingAbi, stakingAddress);
      const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  
      // Convert amount from Ether to Wei
      const amountInWei = web3.utils.toWei(amount.toString(), "ether");
      const monthWei = web3.utils.toWei(month.toString(), "ether");
  
      // Check if balance is sufficient
      if (balanceOf < amount) {
        console.error("Insufficient balance to stake");
        // Use a toast notification library for UI feedback if needed
        toast.error("Insufficient balance to stake");
        return;
      }
  
      // Approve the staking contract to spend the tokens
      await tokenContract.methods
        .approve(stakingAddress, amountInWei)
        .send({ from: account });
  
      console.log("Approval successful");
      toast(`Approval successful`);
      // Call the stake method
      await stakingContract.methods
        .stake(amountInWei, month)
        .send({ from: account });
  
      setIsStaked(true);
      console.log("Tokens staked successfully");
      toast(`Tokens staked successfully`);
  
      // After successful staking, call getUserStats to refresh user stats
      if (account && isBSC) {
        getUserStats(); 
        rewardsBlocks(); // Call the function to update the stats after staking
      }
  
    } catch (error) {
      console.error("Error processing transaction:", error.message);
      // Optionally, you can use a toast notification library for UI feedback
      toast.error(`Error processing transaction: ${error.message}`);
    }
  };
  

  const Claim = async () => {
    try {
      // Ensure Web3 is available
      if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
      }

      const web3 = new Web3(window.ethereum);
      const stakingContract = new web3.eth.Contract(stakingAbi, stakingAddress);

      // Validate account
      if (!account) {
        throw new Error("Account is not connected");
      }

      // Pass a valid uint256 value
      const index = 0; // Use a number, not a string

      await stakingContract.methods
        .claimRewards(index) // Correct format
        .send({ from: account });
        setIsStaked(false);
      toast(`Tokens claimed successfully`);
    } catch (error) {
      toast.error(`Error processing transaction: ${error.message}`);
    }
  };
  const [currentUnixTime, setCurrentUnixTime] = useState(0);
  const [remainingUnixTime, setRemainingUnixTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  

  // Update current Unix time every second
  useEffect(() => {
    const getUnixTime = () => {
      const unixTime = Math.floor(Date.now() / 1000);
      setCurrentUnixTime(unixTime);
    };

    getUnixTime(); // Call initially

    const interval = setInterval(getUnixTime, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Fetch remaining time to unstake
  useEffect(() => {
    const getRemainingTimeToUnstake = async () => {
      if (!account || !isBSC) {
        setErrorMessage("Please connect to Binance Smart Chain Testnet.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const financeAppTokenOf = new web3.eth.Contract(
          stakingAbi,
          stakingAddress
        );

        const remaining = await financeAppTokenOf.methods
          .getRemainingTimeToUnstake(account, 0)
          .call();

        setRemainingUnixTime(Number(remaining));
        console.log("Remaining time to unstake:", remaining);
      } catch (error) {
        console.error("Error fetching remaining time:", error);
      }
    };

    if (account && isBSC) {
      getRemainingTimeToUnstake();
    }
  }, [account, isBSC, stakingAbi, stakingAddress]);

  const unstake = async () => {
    try {
      // Ensure Web3 is available
      if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
      }

      const web3 = new Web3(window.ethereum);
      const stakingContract = new web3.eth.Contract(stakingAbi, stakingAddress);

      // Validate account
      if (!account) {
        throw new Error("Account is not connected");
      }

      // Pass a valid uint256 value
      const index = 0; // Use a number, not a string

      await stakingContract.methods
        .withdraw(index) // Correct format
        .send({ from: account });
      toast(`Tokens claimed successfully`);
    } catch (error) {
      toast.error(`Error processing transaction: ${error.message}`);
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        console.error("Content loading error:", error);
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
      <ToastContainer />
      <div className="bg-[#EAF0EA] relative overflow-hidden">
        <img
          src="/images/lines_apartamenty.svg"
          alt="lines"
          width={"auto"}
          height={"auto"}
          loading="lazy"
          className="absolute right-0 top-[-10%]"
        />
        <div className="container mx-auto pt-8 pb-40 relative index-1">
          <div className="text-center flex flex-col justify-center items-center">
            <img
              src="/images/icon _coin_.svg"
              alt="qdo coin"
              width={"34"}
              height={"34"}
              loading="eager"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 mt-6 hero-h1">
              $QDV TOKEN STAKING
            </h1>
          </div>
          <div className="flex flex-wrap justify-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 pb-4"
              >
                <div className="card">
                  {/* Conditional rendering based on index for different card content */}
                  {index === 0 && (
                    <>
                      <div>
                        <p>Staked Balance</p>
                        <p className="highlight">
                          {stakBalance} <span className="upper">$QDV</span>
                        </p>
                      </div>
                      <div>
                        <p>Your Stakeable</p>
                        <p className="highlight">
                          {balanceOf} <span className="upper">$QDV</span>
                        </p>
                      </div>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <div>
                        <p>% of Pool</p>
                        <p className="highlight">{pool}</p>
                      </div>
                      <div>
                        <p>Total Stacked</p>
                        <p className="highlight">
                          {totalStakedBalance}{" "}
                          <span className="upper">$QDV</span>
                        </p>
                      </div>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <div>
                        <p>Estimated Rewards</p>
                        <p className="highlight">100%</p>
                      </div>
                      <div className="returns">
                        <p>→ Returns = Annual returns percentage</p>
                        <p>→ Monthly = Returns / 12</p>
                        <p>→ Daily = Returns / 365</p>
                      </div>
                    </>
                  )}
                  {index === 3 && (
                    <div>
                      <div>
                        <p>Current Rewards</p>
                        <p className="highlight">
                          {rewardsBlock}{" "}
                          <span className="upper"> Per Block</span>
                        </p>
                      </div>
                    </div>
                )}
                {index === 4 && (
                  <div>
                  {isStaked ? (
                    <div>
                      {/* Unstake Section */}
                      <div>
                        <p>UnStake</p>
                      </div>
                      <button
                        className="btn-staking"
                        onClick={unstake}
                        disabled={currentUnixTime > remainingUnixTime}
                      >
                        {currentUnixTime > remainingUnixTime
                          ? "Unstake Disabled"
                          : "Unstake"}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Stake Section */}
                      <div className="stakinginput">
                        <p>Staking</p>
                        <input
                          className="mt-3"
                          type="number"
                          value={amount}
                          onChange={ChangeHandler}
                          placeholder="Enter Amount"
                          color="black"
                        />
                        <input
                          className="mt-3"
                          type="number"
                          value={month}
                          onChange={ChangeHandlerMonth}
                          placeholder="Enter Month"
                          color="black"
                        />
                        <button className="btn-staking" onClick={staking}>
                          Stake
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                  )}
              
                  {index === 5 && (
                    <>
                      <div>
                        <p>Total Rewards</p>
                        <p className="highlight">
                          {totalClaim} <span className="upper">$QDV</span>
                        </p>
                      </div>
                      <button
                        className="gradient-button text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center"
                        onClick={Claim}
                      >
                        Claim Rewards
                        <i className="ms-8 fas fa-arrow-right"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div className="w-full lg:w-3/5 mt-2 me-auto">
              <div className="card">
                <div className="chart-container">
                  <div className="chart-title">Rewards Unlock</div>
                  <img
                    src="/images/lines.png"
                    alt="lines"
                    width={"100%"}
                    height={"100%"}
                    loading="lazy"
                    className="chart-image"
                  />
                  <div className="chart">
                    <div className="chart-grid"></div>
                    <div className="chart-y-axis">
                      <div className="chart-y-axis-label">0M</div>
                      <div className="chart-y-axis-label">1M</div>
                      <div className="chart-y-axis-label">2M</div>
                      <div className="chart-y-axis-label">3M</div>
                    </div>
                    <div className="chart-bar may"></div>
                    <div className="chart-bar june"></div>
                    <div className="chart-label may">May</div>
                    <div className="chart-label june">June</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Subpage;
