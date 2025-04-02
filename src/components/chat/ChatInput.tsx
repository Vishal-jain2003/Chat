
import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../ui/button";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isConnected: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isConnected }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
            disabled={!isConnected}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || !isConnected}
          className="h-11 w-11 rounded-full p-0 flex items-center justify-center"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
      {!isConnected && (
        <div className="text-xs text-yellow-600 mt-2 animate-pulse-subtle">
          Connecting to server...
        </div>
      )}
    </div>
  );
};

export default ChatInput;


