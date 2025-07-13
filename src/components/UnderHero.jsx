import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function UnderHero() {
  useFadeInObserver();

  return (
    <section id="under-hero">
      <div className="bg-white w-full py-12 relative overflow-hidden">
        <img
          src="/images/lines_apartamenty.svg"
          alt="lines"
          width={"auto"}
          height={"auto"}
          loading="lazy"
          className="absolute right-0 top-[-50%]"
        />
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 relative index-1">
            <div className="rounded-lg overflow-hidden col-span-6 md:col-span-4">
              <img
                src="/images/image.png"
                alt="Modern hotel building with greenery"
                className="w-full h-auto object-cover rounded-lg fade"
              />
            </div>
            <div className="flex flex-col justify-center relative svg-background md:p-6 rounded-lg col-span-6">
              <h2 className="text-4xl font-light text-gold mb-4 fade">
                About the QDVI Project
              </h2>
              <strong className="text-gray-600 mb-4 fade">
                QDVI is an innovative project aimed at building a luxury hotel
                in Kudowa-Zdrój, with a long-term vision for growth and global
                market expansion.
              </strong>
              <p className="text-gray-600 mb-4 fade">
                Our mission is to deliver unparalleled hospitality experiences
                for the most discerning clients, offering not only comfortable
                spaces but also exceptional moments that meet the expectations
                of modern travelers. By combining contemporary architecture,
                cutting-edge technologies, and outstanding service, QDVI
                strives to set a new standard of luxury in the hospitality
                industry, going beyond typical hotel services.
              </p>
              <p className="text-gray-600 mb-4 fade">
                The primary goal of our ICO is to raise capital for the
                construction of the first luxury hotel in Kudowa-Zdrój, which
                will serve as the foundation for our future network of hotels in
                exclusive locations across Europe and the world.
              </p>
              <strong className="text-gray-600 fade">
                With the funds raised, we aim not only to complete the
                construction and furnish the hotel in Kudowa-Zdrój but also to
                expand our concept on an international scale, introducing the
                QDVI brand to prestigious tourist and business destinations.
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-100 w-full py-12">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
            <div className="flex flex-col justify-center md:p-6 col-span-6 area-2">
              <h2 className="text-4xl font-light text-gold mb-4 fade">
                Our Vision for Expansion <br /> and Global Growth
              </h2>
              <p className="text-gray-600 mb-4 fade">
                The completion of our first property in Kudowa-Zdrój is just the
                beginning of our journey. <br />
                <strong>
                  Our long-term goal is to create an entire network of luxury
                  hotels under the QDVI brand, symbolizing the highest
                  standards of quality, an innovative approach to hospitality,
                  and unique experiences.
                </strong>
              </p>
              <p className="text-gray-600 mb-4 fade">
                As part of our development plan, we aim to expand into European
                markets, starting with countries such as Germany, Switzerland,
                Austria, and France, which have a high demand for luxury
                recreational and leisure properties.
              </p>
              <p className="text-gray-600 mb-4 fade">
                In the future, we also plan to enter global markets,
                particularly regions where the luxury real estate and tourism
                sectors are experiencing steady growth, such as the Middle East,
                Southeast Asia, and North America. We strive to operate in
                locations with high tourism and investment potential,
                contributing to the coherence and dynamism of our brand and
                offering guests the exceptional experiences that define QDVI.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden col-span-6 md:col-span-4 area-1">
              <img
                src="/images/image2.png"
                alt="Icon representing growth and expansion"
                className="w-full h-auto object-cover rounded-lg fade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UnderHero;
