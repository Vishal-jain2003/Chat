
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { MessageSquare } from "lucide-react";
// import TextInput from "../ui/TextInput";
// import { Button } from "../ui/button";

// interface JoinRoomProps {
//   onCreateRoom?: (roomId: string) => void;
//   onJoinRoom?: (roomId: string, username: string) => void;
// }

// const JoinRoom: React.FC<JoinRoomProps> = () => {
//   const [roomId, setRoomId] = useState("");
//   const [username, setUsername] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const [isJoining, setIsJoining] = useState(false);
//   const navigate = useNavigate();

//   const handleCreateRoom = async () => {
//     if (!roomId.trim() || !username.trim()) {
//       toast.error("Please enter a room ID and your username");
//       return;
//     }
  
//     setIsCreating(true);

//     const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  
//     try {
      
//       const response = await fetch(`${API_URL}/api/v1/rooms`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "text/plain", // Backend expects plain text
//         },
//         body: roomId, // Send raw roomId (not JSON.stringify)
//       });
  
//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }
  
//       localStorage.setItem("username", username);
  
//       navigate(`/chat/${roomId}`);
//       toast.success(`Room "${roomId}" created successfully`);
//     } catch (error) {
//       toast.error(error.message || "Failed to create room. Please try again.");
//       console.error("Error creating room:", error);
//     } finally {
//       setIsCreating(false);
//     }
//   };
  
  

//   const handleJoinRoom = async () => {
//     if (!roomId.trim() || !username.trim()) {
//       toast.error("Please enter a room ID and your username");
//       return;
//     }

//     setIsJoining(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 800));
      
//       // Store username in localStorage
//       localStorage.setItem("username", username);
      
//       // Navigate to the chat room
//       navigate(`/chat/${roomId}`);
//     } catch (error) {
//       toast.error("Failed to join room. Please check if the room ID is correct.");
//       console.error("Error joining room:", error);
//     } finally {
//       setIsJoining(false);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
//       <div className="flex flex-col items-center mb-6">
//         <div className="bg-primary rounded-full p-3 mb-4">
//           <MessageSquare className="h-6 w-6 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Join a Chat Room</h2>
//         <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
//           Create or join an existing room to start chatting
//         </p>
//       </div>

//       <div className="space-y-4">
//         <TextInput
//           label="Your Name"
//           placeholder="Enter your display name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <TextInput
//           label="Room ID"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />

//         <div className="grid grid-cols-2 gap-4 pt-2">
//           <Button
//             onClick={handleJoinRoom}
//             disabled={isJoining}
//             variant="outline"
//             className="w-full"
//           >
//             {isJoining ? (
//               <>
//                 <span className="animate-spin mr-2">⟳</span>
//                 Joining...
//               </>
//             ) : (
//               "Join Room"
//             )}
//           </Button>
          
//           <Button
//             onClick={handleCreateRoom}
//             disabled={isCreating}
//             className="w-full"
//           >
//             {isCreating ? (
//               <>
//                 <span className="animate-spin mr-2">⟳</span>
//                 Creating...
//               </>
//             ) : (
//               "Create Room"
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinRoom;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import TextInput from "../ui/TextInput";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface JoinRoomProps {
  onCreateRoom?: (roomId: string) => void;
  onJoinRoom?: (roomId: string, username: string) => void;
}

const JoinRoom: React.FC<JoinRoomProps> = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const handleCreateRoom = async () => {
    if (!roomId.trim() || !username.trim()) {
      toast.error("Please enter a room ID and your username");
      return;
    }
    if (!API_URL) {
      console.error("API_URL is not defined");
      toast.error("Server configuration error");
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: roomId.trim(),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      localStorage.setItem("username", username.trim());
      navigate(`/chat/${roomId.trim()}`);
      toast.success(`Room "${roomId}" created successfully`);
    } catch (error) {
      toast.error(error.message || "Failed to create room. Please try again.");
      console.error("Error creating room:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomId.trim() || !username.trim()) {
      toast.error("Please enter a room ID and your username");
      return;
    }
    if (!API_URL) {
      console.error("API_URL is not defined");
      toast.error("Server configuration error");
      return;
    }

    setIsJoining(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/rooms/${roomId.trim()}`);
      if (!response.ok) {
        throw new Error("Room does not exist");
      }

      localStorage.setItem("username", username.trim());
      navigate(`/chat/${roomId.trim()}`);
      toast.success(`Joined room "${roomId}"`);
    } catch (error) {
      toast.error(error.message || "Failed to join room. Please check if the room ID is correct.");
      console.error("Error joining room:", error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700"
    >
      <div className="flex flex-col items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 mb-4 shadow-md">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Join a Chat Room
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
          Create or join an existing room to start chatting
        </p>
      </div>

      <div className="space-y-4">
        <TextInput
          label="Your Name"
          placeholder="Enter your display name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
        />

        <TextInput
          label="Room ID"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <Button
            onClick={handleJoinRoom}
            disabled={isJoining || isCreating}
            variant="outline"
            className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {isJoining ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Joining...
              </>
            ) : (
              "Join Room"
            )}
          </Button>

          <Button
            onClick={handleCreateRoom}
            disabled={isCreating || isJoining}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            {isCreating ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Creating...
              </>
            ) : (
              "Create Room"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default JoinRoom;
