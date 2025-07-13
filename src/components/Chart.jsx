import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function Chart() {
  useFadeInObserver();

  return (
    <section id="chart" className="py-8">
      <div className="text-center mt-10 flex flex-col items-center wrap">
        <img
          src="/images/ico2.svg"
          alt="ico"
          width={"40"}
          height={"40"}
          loading="lazy"
        />
        <strong
          className="text-lg font-light"
          style={{ cssText: "color:#C7B77B!important" }}
        >
          $QDV
        </strong>
        <h2 className="text-4xl">Tokenomics</h2>
      </div>
      <div className="container container-chart pb-12">
        <div className="grid md:grid-cols-9 justify-content-center gap-12">
          <img
            src="/images/chart2.png"
            alt="Pie chart with various sections"
            className="fade col-span-8 md:col-span-5 object-contain"
            width={"100%"}
            height={"100%"}
          />

          <div className="col-span-8 md:col-span-4">
            <h3 className="text-gold text-3xl mb-10">
              Tokenomics of QDVI (QDV){" "}
            </h3>
            <p>
              The total supply of QDV tokens is 50,000,000,000 QDV, with a
              structured allocation plan to support the project's growth and
              promotion.
            </p>
            <br />
            <p>
              Below is the detailed breakdown of the token distribution and
              usage:
            </p>
            <p className="text-yellow">Total Supply: 50,000,000,000 QDV</p>
            <br />
            <p>
              The token allocation for the "QDVI" project is strategically
              planned to ensure adequate funding for key aspects of platform
              development and promotion. With a total supply of 50,000,000,000
              QDV, a significant portion is allocated to the ICO and presale,
              aiming to raise a total of $16,000,000 USD. Additional tokens are
              allocated for marketing, development, airdrops, the team, exchange
              listings, NFT creation and promotion, and ensuring liquidity,
              supporting the comprehensive growth and promotion of the platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chart;
