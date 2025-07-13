import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function Vizualizations() {
  useFadeInObserver();

  return (
    <section id="vizualizations" className="relative overflow-hidden">
      <img
        src="/images/lines_apartamenty.svg"
        alt="lines"
        width={"auto"}
        height={"auto"}
        loading="lazy"
        className="absolute right-0 bottom-[-25%]"
      />
      <div className="container mx-auto p-4 pb-20">
        <div className="text-center mt-10 flex flex-col items-center">
          <img
            src="/images/ICO.svg"
            alt="ico"
            width={"40"}
            height={"40"}
            loading="lazy"
          />
          <strong className="text-lg font-light" style={{ color: "#718D71" }}>
            Take a look on
          </strong>
          <h2 className="text-4xl">Our visualizations</h2>
        </div>
        <div className="text-center mx-auto text-gray-600 mt-16 mb-8 fade">
          <h3 className="text-4xl font-light">
            Apartments Designed by <br /> Dorota Szelągowska Studio
          </h3>
          <p className="mt-4 font-light">
            Szelągowska Design Studio has developed three style and furnishing
            options for the apartments. <br />
            This approach aims to offer a wider range of sophisticated yet
            distinct finishing options, <br />
            which we are confident will attract significant interest from
            investors.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="overflow-hidden  fade">
            <h3 className="text-3xl font-light text-gray-800 mt-4 mb-4 text-center text-gold">
              Modern
            </h3>
            <img
              src="/images/modern.png"
              alt="Modern apartment interior with large windows and elegant furniture"
              className="w-full h-auto"
            />
          </div>
          <div className="overflow-hiddenfade">
            <h3 className="text-3xl font-light text-gray-800 mt-4 mb-4 text-center text-gold">
              Minimal
            </h3>
            <img
              src="/images/minimal.png"
              alt="Minimalist apartment interior with clean lines and neutral colors"
              className="w-full h-auto"
            />
          </div>
          <div className="overflow-hidden  fade">
            <h3 className="text-3xl font-light text-gray-800 mt-4 mb-4 text-center text-gold">
              Japandi
            </h3>
            <img
              src="/images/japandi.png"
              alt="Japandi style apartment interior with a blend of Japanese and Scandinavian design elements"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="text-center">
          <a
            href="https://qudova-1.gitbook.io/qudova_whitepaper-v0.1/wizualizacje"
            target="_blank"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 text-lg gradient-button-2 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center fade"
          >
            Learn more <i className="ms-8 fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Vizualizations;
