import "../App.css";
import { useState, useEffect, useRef } from "react";
import { useFadeInObserver } from "../hooks/useFadeInObserver";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA

function Form() {
  useEffect(() => {
    // Cookie consent script logic...
  }, []);

  useFadeInObserver();

  const formRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "General Inquiry", // Default value for the subject
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // Effect to observe the form visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFormVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  // Effect to clear notifications after 5 seconds
  useEffect(() => {
    let timeoutId;
    if (submitStatus.success !== null || submitStatus.error !== null) {
      timeoutId = setTimeout(() => {
        setSubmitStatus((prev) => ({
          ...prev,
          success: null,
          error: null,
        }));
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [submitStatus.success, submitStatus.error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state
    setSubmitStatus({ loading: true, success: null, error: null });

    // Check if reCAPTCHA is verified
    if (!recaptchaToken) {
      setSubmitStatus({
        loading: false,
        success: null,
        error: "Please verify that you are not a robot.",
      });
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Send the email along with the reCAPTCHA token
      await axios.post(
        "/send-email.php",
        new URLSearchParams({ ...formData, recaptchaToken }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Set success status
      setSubmitStatus({
        loading: false,
        success: "Message sent successfully!",
        error: null,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "General Inquiry",
        message: "",
      });
      setRecaptchaToken(null);
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: null,
        error: error.response?.data?.errors?.[0] || "An error occurred",
      });
    }
  };

  return (
    <div className="mb-12 md:mb-24">
      <div className="container mx-auto">
        <div className="flex gap-10 md:gap-20 justify-center formular">
          <div className="contact-side bg-[#324032] text-white p-8 pb-60 rounded-full shadow-lg w-full lg:w-1/3">
            <h2 className="text-2xl font-normal mb-2 text-[#C7B77B]">
              Contact Information
            </h2>
            <p className="mb-20">Say something to start a live chat!</p>
            <a href="mailto:support@gdvi.net" className="mb-8 block">
              <i className="fas fa-envelope mr-6"></i>
              support@gdvi.net
            </a>
            <a href="https://t.me/support_gdvi" target="_blank" className="mb-8 block">
              <i className="fa-brands fa-telegram mr-6"></i>
              @support_gdvi
            </a>
            <a href="https://x.com/support_gdvi" target="_blank" className="mb-8 block">
              <i className="fa-brands fa-x-twitter mr-6"></i>
              @support_gdvi
            </a>
            <img
              src="/images/bubbles.png"
              alt="bubbles"
              width={"auto"}
              height={"auto"}
              loading="lazy"
            />
          </div>
          <div className="bg-white py-8 rounded-lg w-full lg:w-2/3">
            <div ref={formRef}>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                  {/* Notification Area */}
                  {(submitStatus.success || submitStatus.error) && (
                    <div
                      className={`
                fixed top-28 right-4 z-50 p-4 rounded-lg shadow-lg
                ${submitStatus.success ? "bg-green-500" : "bg-red-500"}
                text-white transition-all duration-300 ease-in-out
              `}
                    >
                      {submitStatus.success || submitStatus.error}
                    </div>
                  )}
                  <div>
                    <label className="block text-gray-600">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                  <div>
                    <label className="block text-gray-600">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-14">
                  <label className="block text-xl text-gray-800 font-regular font-[500] mb-4">
                    Select Subject?
                  </label>
                  <div className="flex items-center justify-start flex-wrap row-gap-4">
                    <input
                      type="radio"
                      id="generalInquiry"
                      name="subject"
                      value="General Inquiry"
                      className="hidden"
                      checked={formData.subject === "General Inquiry"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="generalInquiry"
                      className="mr-4 cursor-pointer"
                    >
                      <span className="inline-block w-6 h-6 mr-2">
                        <img
                          src="/images/checkedcheckbox.svg"
                          alt="Checked"
                          className="w-full h-full"
                        />
                      </span>
                      General Inquiry
                    </label>

                    <input
                      type="radio"
                      id="otherInquiry"
                      name="subject"
                      value="Other Inquiry"
                      className="hidden"
                      onChange={handleChange}
                    />
                    <label htmlFor="otherInquiry" className="cursor-pointer">
                      <span className="inline-block w-6 h-6 mr-2">
                        <img
                          src="/images/checkbox.svg"
                          alt="Unchecked"
                          className="w-full h-full"
                        />
                      </span>
                      Other Inquiry
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600">Message</label>
                  <textarea
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
                    placeholder="Write your message.."
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="flex wrap gap-4 row-gap-8 justify-between mt-10">
                  {isFormVisible && (
                    <ReCAPTCHA
                      sitekey="6LeyTcQpAAAAAA8ie_5uMywWVBLx8WOcwgitUyEv" // Replace with your site key
                      onChange={(token) => setRecaptchaToken(token)}
                    />
                  )}
                  <button
                    type="submit"
                    disabled={submitStatus.loading}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-5 px-10 rounded-full text-lg gradient-button-3 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center fade"
                  >
                    {submitStatus.loading ? "Sending..." : "Send message"}
                    <i className="fas fa-arrow-right ml-6"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
