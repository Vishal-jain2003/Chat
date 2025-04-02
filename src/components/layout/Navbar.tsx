
import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";


const Navbar: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 sm:px-8 border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg transition-all duration-300 group-hover:scale-105">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">ChatRoom</span>
        </Link>
        
        <nav className="hidden sm:flex items-center gap-8">
          {/* <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Home</Link> */}
          {/* <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">About</Link> */}
          <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
