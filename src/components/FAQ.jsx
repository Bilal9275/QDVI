import { useState } from "react";
import "../App.css";
import { useFadeInObserver } from "../hooks/useFadeInObserver";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="faq-item" onClick={onClick}>
      <div>
        <div className="faq-question">{question}</div>
        <div className={`faq-answer ${isOpen ? "open" : ""}`}>{answer}</div>
      </div>
      <div>
        <i className={`faq-icon fas fa-arrow-${isOpen ? "up" : "down"}`}></i>
      </div>
    </div>
  );
};

function FAQ() {
  useFadeInObserver();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is QDVI?",
      answer:
        "QDVI is an innovative project focused on creating a network of tokenized 5-star luxury hotels, starting with our flagship property in Kudowa-Zdrój. Our vision combines modern architecture, cutting-edge technology, and unmatched hospitality experiences.",
    },
    {
      question:
        'What does "tokenized hotel" mean?',
      answer:
        "A tokenized hotel allows investors to participate in the funding of the project through blockchain-based tokens. These tokens represent ownership or investment stakes, providing opportunities for returns and benefits as the hotel generates revenue.",
    },
    {
      question: "Why choose an ICO for QDVI?",
      answer:
        "The ICO (Initial Coin Offering) allows us to democratize access to investment opportunities in the luxury hospitality sector. It ensures transparency, scalability, and inclusivity by leveraging blockchain technology. Payments on InTheHouse are made easy and secure through smart contracts. You can pay using traditional methods such as credit cards and bank transfers, as well as cryptocurrencies. Smart contracts automatically process payments once the service is completed and confirmed by the client, ensuring a seamless and secure transaction.",
    },
    {
      question: "What are the benefits of investing in QDVI?",
      answer:
        "Investors can gain financial returns from the hotel’s revenue, access exclusive perks such as discounted stays or VIP services, and be part of a groundbreaking project redefining luxury hospitality.",
    },
    {
      question: "Where will the first QDVI hotel be located?",
      answer:
        "The first QDVI hotel will be built in Kudowa-Zdrój, a stunning location in a landscape park, ideal for relaxation and luxury travel.",
    },
    {
      question: "What is the long-term vision for QDVI?",
      answer:
        "Our long-term goal is to expand QDVI into a global network of luxury hotels, starting with European destinations like Germany, Switzerland, Austria, and France, followed by strategic locations in the Middle East, Southeast Asia, and North America.",
    },
    {
      question: "How can I participate in the QDVI ICO?",
      answer:
        "You can participate by purchasing QDVI tokens during our ICO phase. Tokens will be available through our platform, where you can use cryptocurrencies to make your investment.",
    },
    {
      question: "How will QDVI ensure the quality of its hotels?",
      answer:
        "Each QDVI property will feature state-of-the-art architecture, innovative technology, and exceptional service standards to deliver a luxury experience that exceeds expectations.",
    },
    {
      question: "Are there any benefits for token holders beyond financial returns?",
      answer:
        "Yes, QDVI token holders may enjoy exclusive benefits, such as early access to bookings, discounts on stays, and special privileges at our hotels.",
    },
    {
      question: "How can I stay updated on QDVI's progress?",
      answer:
        "Follow us on our website and social media channels for the latest updates on our project milestones, ICO details, and expansion plans.",
    }
  ];

  return (
    <section id="faq">
      <div className="container mx-auto p-4 py-20">
        <div className="faq-header fade pb-6">Have any questions?</div>
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQ;
