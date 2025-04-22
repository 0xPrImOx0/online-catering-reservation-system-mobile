// utils/socket.ts
import { io, Socket } from "socket.io-client";
import { MenuItem } from "~/types/menu-types";

let socket: Socket;

export const initSocket = () => {
  // Direct connection to the backend, replace with your backend URL
  if (!socket) {
    socket = io("http://192.168.100.64:5500", {
      transports: ["websocket"], // Use websockets for real-time communication
      withCredentials: true, // optional but matches your backend config
    });

    // Log successful connection
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    // Listen for the custom "connected" event from the backend
    socket.on("connected", (data) => {
      console.log("🟢 Server says:", data.message);
    });
  }
};

export const subscribeToMenuUpdates = (callback: (menu: MenuItem) => void) => {
  if (socket) {
    socket.on("menuUpdated", callback); // Listen for menu update event
  }
};

export const subscribeToMenuCreated = (callback: (menu: MenuItem) => void) => {
  if (socket) {
    socket.on("menuCreated", callback); // Listen for menu created event
  }
};

export const subscribeToMenuDeleted = (callback: (menu: MenuItem) => void) => {
  if (socket) {
    socket.on("menuDeleted", callback); // Listen for menu deletion event
  }
};

export const unsubscribeFromMenuUpdates = () => {
  if (socket) {
    socket.off("menuUpdated"); // Stop listening for menu updates
  }
};

export const unsubscribeFromMenuCreated = () => {
  if (socket) {
    socket.off("menuCreated"); // Stop listening for menu created
  }
};

export const unsubscribeFromMenuDeleted = () => {
  if (socket) {
    socket.off("menuDeleted"); // Stop listening for menu deleted
  }
};
