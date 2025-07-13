import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function Steps() {
  useFadeInObserver();
  const timelineData = [
    {
      number: "1.",
      quarter: "Q1 2025",
      title: "ICO Launch",
      description: "Start our initial coin offering and expand our team",
    },
    {
      number: "2.",
      quarter: "Q2 2025",
      title: "Presale and early activities",
      description:
        "Launch presale and introduce staking functionality. Begin platform development and test our app in major European cities.",
    },
    {
      number: "3.",
      quarter: "Q3 2025",
      title: "Platform Development",
      description:
        "Continue building our platform and list QDV tokens on DEXs.",
    },
    {
      number: "4.",
      quarter: "Q4 2025",
      title: "Beta Testing and Optimization",
      description:
        "List QDV tokens on CEXs, integrate NFTs, and release the beta platform.",
    },
    {
      number: "5.",
      quarter: "Q5 2025",
      title: "Full Launch and expansion",
      description:
        "Officially launch the platform, form strategic partnerships, and expand our content offerings.",
    },
    {
      number: "6.",
      quarter: "Q6 2025",
      title: "Future Support",
      description:
        "Continue enhancing platform features and user experience. Expand service offerings and market reach. Develop additional partnerships and integrations to provide comprehensive home services globally.",
    },
  ];

  return (
    <section id="steps" className="pb-16">
      <div className="text-center pt-10 flex flex-col items-center">
        <img
          src="/images/ico2.svg"
          alt="ico"
          width={"40"}
          height={"40"}
          loading="lazy"
        />
        <strong
          className="text-lg font-normal"
          style={{ cssText: "color:#718D71!important" }}
        >
          QDVI
        </strong>
        <h2 className="text-4xl">Roadmap</h2>
      </div>
      <div className="container mx-auto px-4 pt-44 pb-8" style={{ maxWidth:"1240px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 row-gap-2 relative">
          {timelineData.map((item, index) => (
            <div key={index} className="timeline-item fade">
              <div className="timeline-number">{item.number}</div>
              <h3>{item.quarter}</h3>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
          <img src="/images/lines.svg" alt="line" className="steps-line" />
        </div>
      </div>
    </section>
  );
}

export default Steps;
