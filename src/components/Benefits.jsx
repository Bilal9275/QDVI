import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function Benefits() {
  useFadeInObserver();

  return (
    <section id="benefits" className="relative overflow-hidden">
      <img
        src="/images/lines_apartamenty2.svg"
        alt="lines"
        width={"auto"}
        height={"auto"}
        loading="lazy"
        className="absolute left-0 top-0"
      />
      <div className="container mx-auto text-center p-8 pt-0 pb-16">
        <div className="text-center mt-10 flex flex-col items-center">
          <img
            src="/images/ICO.svg"
            alt="ico"
            width={"40"}
            height={"40"}
            loading="lazy"
          />
          <strong className="text-lg font-light" style={{ color: "#718D71" }}>
            Learn more about us
          </strong>
          <h2 className="text-4xl">Benefits&Innovations</h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8 max-w-screen-xl mx-auto pt-12">
          <div className="bg-green-100 px-10 py-16 rounded-lg flex-1 w-full lg:w-1/3 fade">
            <img
              src="/images/first2.svg"
              alt="Transparency and trust"
              loading="lazy"
              width={"auto"}
              height={"98"}
              className="mx-auto"
            />
            <h3 className="text-4xl mt-6 mb-8">
              Transparency
              <br />
              and trust
            </h3>
            <p>
              Using blockchain technology, QDVI ensures full transparency
              in transactions and service quality, building trust between
              clients and service providers.
            </p>
          </div>
          <div className="bg-green-100 px-10 py-16 rounded-lg flex-1 w-full lg:w-1/3 fade">
            <img
              src="/images/second2.svg"
              alt="Automated payments"
              loading="lazy"
              width={"auto"}
              height={"98"}
              className="mx-auto"
            />
            <h3 className="text-4xl mt-6 mb-8">
              Automated
              <br />
              payments
            </h3>
            <p>
              Smart contracts automate payment processes, guaranteeing secure
              and timely transactions without the need for intermediaries.
            </p>
          </div>
          <div className="bg-green-100 px-10 py-16 rounded-lg flex-1 w-full lg:w-1/3 fade">
            <img
              src="/images/third3.svg"
              alt="Comprehensive service offering"
              loading="lazy"
              width={"auto"}
              height={"98"}
              className="mx-auto"
            />
            <h3 className="text-4xl mt-6 mb-8">
              Comprehensive
              <br />
              service offering
            </h3>
            <p>
              At QDVI, we provide a wide range of home services designed
              to make your life easier. From cleaning and childcare to gardening
              and interior design, our platform connects you to trusted
              professionals to handle all your home needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
