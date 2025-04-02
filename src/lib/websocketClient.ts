import Stomp from "stompjs";
import SockJS from "sockjs-client";

class WebSocketClient {
  private socket: any;
  private stompClient: any;
  private connected: boolean = false;
  private subscriptions: { [key: string]: any } = {};
  private messageHandlers: ((message: any) => void)[] = [];
  private connectHandlers: (() => void)[] = [];
  private disconnectHandlers: (() => void)[] = [];

  

  constructor() {
    this.socket = null;
    this.stompClient = null;
    this.connected = false;
    this.subscriptions = {};
  }

  

  connect(roomId: string, onMessageReceived: (message: any) => void) {
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    return new Promise((resolve, reject) => {
      // this.socket = new SockJS("http://localhost:8080/chat");
      // this.socket = new SockJS("${API_URL}/chat");
      this.socket = new SockJS(`${API_URL}/chat`);



      
      this.stompClient = Stomp.over(this.socket);

      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          console.log("Connected to WebSocket");

          this.connectHandlers.forEach((handler) => handler());

          const subscription = this.stompClient.subscribe(
            `/topic/room/${roomId}`,
            (message) => {
              const parsedMessage = JSON.parse(message.body);
              this.messageHandlers.forEach((handler) => handler(parsedMessage));
              onMessageReceived(parsedMessage);
            }
          );

          this.subscriptions[roomId] = subscription;
          resolve(undefined);
        },
        (error) => {
          console.error("WebSocket connection error:", error);
          reject(error);
        }
      );
    });
  }

  sendMessage(roomId: string, message: any) {
    if (this.connected) {
      this.stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
    } else {
      console.error("Cannot send message: WebSocket is not connected");
    }
  }

  disconnect(roomId: string) {
    if (this.subscriptions[roomId]) {
      this.subscriptions[roomId].unsubscribe();
      delete this.subscriptions[roomId];
    }

    if (this.stompClient && this.connected) {
      this.stompClient.disconnect(() => {
        console.log("WebSocket disconnected");
        this.connected = false;
        this.disconnectHandlers.forEach((handler) => handler());
      });
    }
  }

  // ✅ Updated `.on()` method
  on(event: "message" | "connect" | "disconnect", handler: (message?: any) => void) {
    if (event === "message") {
      this.messageHandlers.push(handler);
    } else if (event === "connect") {
      this.connectHandlers.push(handler);
    } else if (event === "disconnect") {
      this.disconnectHandlers.push(handler);
    }
  }

  off(event: "message" | "connect" | "disconnect") {
    if (event === "message") {
      this.messageHandlers = [];
    } else if (event === "connect") {
      this.connectHandlers = [];
    } else if (event === "disconnect") {
      this.disconnectHandlers = [];
    }
  }
}

export default new WebSocketClient();
