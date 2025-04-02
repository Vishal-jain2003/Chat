import React from "react";
import { useNavigate } from "react-router-dom";
import { Github } from "lucide-react"; // GitHub icon

const About = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* About Roomify */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Roomify</h1>
      <p className="text-gray-600 leading-relaxed">
      ChatRoom is a <strong>real-time chat application</strong> built using <strong>React, TypeScript, WebSockets, and Spring Boot</strong>. 
        It enables users to create and join chat rooms instantly, providing a seamless and secure chat experience.
      </p>
      <p className="text-gray-600 leading-relaxed mt-2">
        The backend is powered by <strong>Spring Boot</strong>, ensuring scalability and security, while the frontend is crafted using <strong>React & TypeScript</strong> for a smooth user experience. 
        WebSockets enable real-time messaging, making it perfect for collaboration and instant communication.
      </p>

      {/* Back to Home Button */}
      <button 
        onClick={() => navigate("/")} 
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Back to Home
      </button>

      {/* About the Developer */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-2">About the Developer</h2>
        <p className="text-gray-600">
          Hi, I'm <span className="font-semibold text-blue-600">Vishal Jain</span>, a passionate <strong>full-stack developer</strong> with expertise in 
          <strong> Java, React, and Spring Boot</strong>. I love building scalable and efficient web applications.
        </p>

        {/* GitHub Link with Icon */}
        <p className="mt-2 flex items-center text-blue-600 font-medium">
          <Github className="w-5 h-5 mr-2" />
          <a href="https://github.com/vishal-jain2003" className="underline">GitHub</a>
        </p>
      </div>
    </div>
  );
};

export default About;
