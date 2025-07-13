import "../App.css";
function Footer() {
  return (
    <div>
      <div className="bg-[#1F271F]">
        <div className="text-white pt-4">
          <div className="container mx-auto flex justify-between items-center pt-6 pb-8 wrap gap-8">
            <div className="flex items-center">
              <div className="mr-4">
                <a href="#">
                  <img
                    src="/images/qdovalogo.png"
                    alt="Logo"
                    loading="lazy"
                    width={"auto"}
                    height={"64"}
                  />
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm">
                Privacy policy
              </a>
              <a href="#" className="text-sm">
                Cookies
              </a>
              <a href="#" className="text-sm">
                Contact
              </a>
            </div>
          </div>
          <div className="bg-black">
            <div className="container mx-auto py-4">
              <div className="text-start">
                <p className="text-sm">
                  All Rights Reserved by QDVI Apartments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
