
import React from "react";
import Navbar from "@/components/layout/Navbar";
import JoinRoom from "@/components/chat/JoinRoom";
import { MessageSquare } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="slide-up-staggered" style={{ "--index": 0 } as React.CSSProperties}>
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  Real-time Messaging
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mt-4 slide-up-staggered" style={{ "--index": 1 } as React.CSSProperties}>
                Connect and Chat in <span className="text-primary">Real-time</span>
              </h1>
              
              <p className="text-lg text-gray-600 mt-6 slide-up-staggered" style={{ "--index": 2 } as React.CSSProperties}>
                Start conversations in dedicated rooms. Share ideas, collaborate, and stay connected with secure, real-time messaging.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 slide-up-staggered" style={{ "--index": 3 } as React.CSSProperties}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Instant Messaging</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Secure Rooms</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Group Chats</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md slide-up-staggered" style={{ "--index": 4 } as React.CSSProperties}>
              <JoinRoom />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Roomify. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
