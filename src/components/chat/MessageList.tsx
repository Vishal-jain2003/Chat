
// import React, { useEffect, useRef } from "react";
// import MessageBubble from "./MessageBubble";
// import { formatDistanceToNow } from "date-fns"; // Import date-fns

// export interface Message {
//   content: string;
//   sender: string;
//   timeStamp: string;
// }

// interface MessageListProps {
//   messages: Message[];
//   currentUser: string;
// }

// const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {messages.length === 0 ? (
//         <div className="flex items-center justify-center h-full">
//           <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 max-w-md">
//             <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
//               No messages yet
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               Start the conversation by sending a message below.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <>
//           {messages.map((message, index) => (
//             <MessageBubble
//               key={index}
//               content={message.content}
//               sender={message.sender}
//               timestamp={new Date(message.timeStamp)}
//               isOwnMessage={message.sender === currentUser}
//             />
//           ))}
//         </>
//       )}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default MessageList;


import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { formatDistanceToNow } from "date-fns"; // Import date-fns

export interface Message {
  content: string;
  sender: string;
  timeStamp: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 max-w-md">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Start the conversation by sending a message below.
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              content={message.content}
              sender={message.sender}
              timeAgo={formatDistanceToNow(new Date(message.timeStamp), { addSuffix: true })} // Convert to "X time ago"
              isOwnMessage={message.sender === currentUser}
            />
          ))}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
