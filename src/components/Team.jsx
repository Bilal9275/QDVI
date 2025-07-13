import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

function Team() {
  useFadeInObserver();

  const teamMembers = [
    {
      name: "Arkadiusz<br>Szustak",
      title: "CEO ITH",
      image: "/images/arkadiusz.png",
      alt: "Arkadiusz Szustak",
    },
    {
      name: "Dariusz<br>Kolber",
      title: "CEO ITH",
      image: "/images/dariusz.png",
      alt: "Dariusz Kolber",
    },
    {
      name: "Monika<br>Brzeska",
      title: "Director<br>of Administration",
      image: "/images/monika.png",
      alt: "Monika Brzeska",
    },
    {
      name: "Michał<br>Chodziński",
      title: "Director of ITH<br>– Crypto",
      image: "/images/michal.png",
      alt: "Michał Chodziński",
    },
  ];

  return (
    <section id="team">
      <div className="flex flex-col items-center py-24 container mx-auto index-1">
        <h1 className="text-5xl font-bold mb-20">Meet our team</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-24 sm-gap-12 lg:gap-24">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center fade">
              <img
                src={member.image}
                alt={member.alt}
                width={'223'}
                height={'auto'}
                className="rounded-full mb-4"
              />
              <h2
                className="text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: member.name }}
              ></h2>
              <p
                className="text-purple-500 text-2xl mt-4"
                dangerouslySetInnerHTML={{ __html: member.title }}
              ></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
