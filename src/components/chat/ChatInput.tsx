
// import React, { useState } from "react";
// import { Send } from "lucide-react";
// import { Button } from "../ui/button";

// interface ChatInputProps {
//   onSendMessage: (content: string) => void;
//   isConnected: boolean;
// }

// const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isConnected }) => {
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim() && isConnected) {
//       onSendMessage(message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="border-t border-gray-200 bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
//       <form onSubmit={handleSubmit} className="flex items-center gap-2">
//         <div className="relative flex-1">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={isConnected ? "Type your message..." : "Connecting..."}
//             disabled={!isConnected}
//             className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
//             rows={1}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSubmit(e);
//               }
//             }}
//           />
//         </div>
//         <Button
//           type="submit"
//           disabled={!message.trim() || !isConnected}
//           className="h-11 w-11 rounded-full p-0 flex items-center justify-center"
//         >
//           <Send className="h-5 w-5" />
//         </Button>
//       </form>
//       {!isConnected && (
//         <div className="text-xs text-yellow-600 mt-2 animate-pulse-subtle">
//           Connecting to server...
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInput;


import React, { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "../ui/button";
import Picker from "emoji-picker-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isConnected: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isConnected }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message);
      setMessage("");
      setShowEmojiPicker(false); // Close picker after sending
    }
  };

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 dark:bg-gray-800 dark:border-gray-700 relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
            disabled={!isConnected}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 focus:border-primary focus:ring-1 focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Smile className="h-5 w-5" />
          </button>
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || !isConnected}
          className="h-11 w-11 rounded-full p-0 flex items-center justify-center"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4 z-10">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
      {!isConnected && (
        <div className="text-xs text-yellow-600 mt-2 animate-pulse-subtle">
          Connecting to server...
        </div>
      )}
    </div>
  );
};

export default ChatInput;