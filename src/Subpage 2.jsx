import { useState, useEffect } from "react";

function Subpage() {
  const [isLoading, setIsLoading] = useState(true);

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
            $QDO TOKEN STAKING
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 pb-4">
              <div className="card">
                {/* Conditional rendering based on index for different card content */}
                {index === 0 && (
                  <>
                    <div>
                      <p>Staked Balance</p>
                      <p className="highlight">
                        0 <span className="upper">$QDO</span>
                      </p>
                    </div>
                    <div>
                      <p>Your Stakeable</p>
                      <p className="highlight">
                        0 <span className="upper">$QDO</span>
                      </p>
                    </div>
                  </>
                )}
                {index === 1 && (
                  <>
                    <div>
                      <p>% of Pool</p>
                      <p className="highlight">0%</p>
                    </div>
                    <div>
                      <p>Total Stacked</p>
                      <p className="highlight">
                        50,200,000 <span className="upper">$QDO</span>
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
                        4.00 <span className="upper"> Per Block</span>
                      </p>
                    </div>
                  </div>
                )}
                {index === 4 && (
                  <>
                    <div>
                      <p>Total Rewards</p>
                      <p className="highlight">
                        0 <span className="upper">$QDO</span>
                      </p>
                    </div>
                    <a
                      href="#"
                      className="gradient-button text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center"
                    >
                      Claim Rewards
                      <i className="ms-8 fas fa-arrow-right"></i>
                    </a>
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
    </div>
  );
}

export default Subpage;
