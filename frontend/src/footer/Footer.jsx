const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f0f0f] via-[#141414] to-[#0f0f0f] text-gray-400 py-6 px-4 mt-auto border-t border-gray-800">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
        
        {/* Left Section */}
        <div className="mb-2 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 font-semibold">
            Streamify
          </span>{" "}
          · All rights reserved.
        </div>

        {/* Right Section */}
        <div className="flex space-x-6">
          {["Privacy", "Terms", "Support"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="relative group transition-all"
            >
              <span className="group-hover:text-white">{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
