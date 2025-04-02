import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MessageProps {
  content: string;
  sender: string;
  timeAgo: string;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageProps> = ({
  content,
  sender,
  timeAgo,
  isOwnMessage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex mb-4 w-full", isOwnMessage ? "justify-end" : "justify-start")}
    >
      <div className="flex flex-col max-w-xs">
        {/* Sender Name */}
        <span className={cn("text-xs font-semibold mb-1", isOwnMessage ? "text-blue-600 text-right" : "text-gray-700 text-left")}>
          {sender}
        </span>

        {/* Message Content */}
        <div
          className={cn(
            "p-3 rounded-lg shadow-md w-fit",
            isOwnMessage
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-900 rounded-bl-none"
          )}
        >
          <p className="text-sm">{content}</p>
        </div>

        {/* Time (Always in fixed position) */}
        <span className={cn("text-xs text-gray-500 mt-1", isOwnMessage ? "text-right" : "text-left")}>
          {timeAgo}
        </span>
      </div>
    </motion.div>
  );
};

export default MessageBubble;



// import React from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// export interface MessageProps {
//   content: string;
//   sender: string;
//   timeAgo: string; 
//   isOwnMessage: boolean;
// }

// const MessageBubble: React.FC<MessageProps> = ({
//   content,
//   sender,
//   timeAgo,
//   isOwnMessage,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className={cn(
//         "flex mb-4 items-end",
//         isOwnMessage ? "justify-end" : "justify-start"
//       )}
//     >
//       {!isOwnMessage && (
//         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
//           {sender.charAt(0).toUpperCase()}
//         </div>
//       )}
//       <div
//         className={cn(
//           "max-w-xs p-3 rounded-lg shadow-md",
//           isOwnMessage ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"
//         )}
//       >
//         {!isOwnMessage && (
//           <span className="block text-xs font-semibold text-gray-600 mb-1">
//             {sender}
//           </span>
//         )}
//         <p className="text-sm">{content}</p>
//         <span className="text-xs text-gray-500 block mt-1 text-right">{timeAgo}</span>
//       </div>
//     </motion.div>
//   );
// };

// export default MessageBubble;

