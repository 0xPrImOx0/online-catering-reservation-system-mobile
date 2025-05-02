// utils/socket.ts
import { io, Socket } from "socket.io-client";
import { MenuItem } from "~/types/menu-types";
import { CateringPackagesProps } from "~/types/package-types";

let socket: Socket;

export const initSocket = () => {
  if (typeof window !== "undefined" && !socket) {
    socket = io("http://localhost:5500", {
      withCredentials: true,
    });

    // ✅ Log successful connection
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);
    });

    // Optional: handle connection errors
    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    // Optional: listen for the custom welcome event from backend
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
    socket.on("menuDeleted", callback); // Listen for menu delete event
  }
};

export const subscribeToPackageUpdates = (
  callback: (pkg: CateringPackagesProps) => void
) => {
  if (socket) {
    socket.on("packageUpdated", callback); // Listen for package update event
  }
};

export const subscribeToPackageCreated = (
  callback: (pkg: CateringPackagesProps) => void
) => {
  if (socket) {
    socket.on("packageCreated", callback); // Listen for package created event
  }
};

export const subscribeToPackageDeleted = (
  callback: (pkg: CateringPackagesProps) => void
) => {
  if (socket) {
    socket.on("packageDeleted", callback); // Listen for package delete event
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

export const unsubscribeFromPackageUpdates = () => {
  if (socket) {
    socket.off("packageUpdated"); // Stop listening for package updates
  }
};

export const unsubscribeFromPackageCreated = () => {
  if (socket) {
    socket.off("packageCreated"); // Stop listening for package created
  }
};

export const unsubscribeFromPackageDeleted = () => {
  if (socket) {
    socket.off("packageDeleted"); // Stop listening for package deleted
  }
};
