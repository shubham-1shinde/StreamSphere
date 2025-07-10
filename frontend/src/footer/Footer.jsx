const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 py-6 px-4 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-white font-semibold">Streamify</span>. All rights reserved.
        </div>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
