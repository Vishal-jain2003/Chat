

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import websocketClient from "@/lib/websocketClient";
import { Button } from "@/components/ui/button";

interface Message {
  content: string;
  sender: string;
  timeStamp: string;
}

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>("");

  // Fetch room data and message history
  const fetchRoomData = useCallback(async () => {
    if (!roomId) return;

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


    try {
      // const response = await fetch(`http://localhost:8080/api/v1/rooms/${roomId}`);
      const response = await fetch(`${API_URL}/api/v1/rooms/${roomId}`);
      
      if (!response.ok) {
        throw new Error("Room not found");
      }

      // const messagesResponse = await fetch(`http://localhost:8080/api/v1/rooms/${roomId}/messages?page=0&size=20`);
      const messagesResponse = await fetch(`${API_URL}/api/v1/rooms/${roomId}/messages?page=0&size=20`);


      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      toast.error("Could not find this room. Redirecting to home...");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [roomId, navigate]);

  // Setup WebSocket connection
  const setupWebSocket = useCallback(async () => {
    if (!roomId) return;

    try {
      websocketClient.connect(roomId, (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });
      

      await websocketClient.connect(roomId, (message) => {
        setMessages((prev) => [...prev, message]);
      });

      setIsConnected(true);
      toast.success("Connected to chat room");

      return () => {
        unsubscribeMessage();
        unsubscribeConnect();
        websocketClient.disconnect(roomId);
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
      toast.error("Failed to connect to chat server");
      setIsConnected(false);
    }
  }, [roomId]);

  // Initialize component
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      toast.error("You need to enter your name before joining a room");
      navigate("/");
      return;
    }

    setUsername(storedUsername);

    fetchRoomData();

    let cleanupFn: (() => void) | undefined;

    setupWebSocket().then((cleanup) => {
      if (cleanup) cleanupFn = cleanup;
    });

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [fetchRoomData, setupWebSocket, navigate]);

  // Handle sending messages
  const handleSendMessage = (content: string) => {
    if (!roomId || !username || !isConnected) return;

    const messageRequest = {
      content,
      sender: username,
      roomId,
    };

    websocketClient.sendMessage(roomId, messageRequest);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="mt-4 text-gray-600">Loading chat room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-col flex-1 mt-16">
        <div className="border-b border-gray-200 bg-white px-4 py-3 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center mx-auto max-w-7xl">
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white ">
                Room: {roomId}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isConnected ? "Connected" : "Connecting..."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto " >
          <MessageList messages={messages} currentUser={username} />
          <ChatInput onSendMessage={handleSendMessage} isConnected={isConnected} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

  // WebSocket Event Unsubscription Functions
  function unsubscribeConnect() {
    if (websocketClient.off) {
      websocketClient.off("connect");
    }
  }
  function unsubscribeMessage() {
    if (websocketClient.off) {
      websocketClient.off("message");
    }
  }
