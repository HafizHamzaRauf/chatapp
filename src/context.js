import { createContext, useEffect } from "react";
import { useState } from "react";

export const URI = "http://localhost:4000/";
export const LOCAL_STORAGE_KEY = "chatapp";

export const Context = createContext({
  chatMessages: [],
  addChatMessage(add) {},
  token: "",
  changeToken(tk) {},
  user: null,
  changeUser(user) {},
  logout() {},
});
export const updateLocalStorage = (chatMessages, user, token) => {
  const dataToStore = {
    chatMessages,
    user,
    token,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
};
const clearStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
export const ContextProvider = ({ children }) => {
  // Initialize state from local storage or set default values
  const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  // Function to fetch messages from the backend
  const fetchMessages = async (tk) => {
    try {
      const response = await fetch(`${URI}messages`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tk}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();

      // Update chatMessages with the fetched data
      setChatMessages(data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle the error as needed
    }
  };
  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setChatMessages(parsedData.chatMessages || []);
      setUser(parsedData.user || null);
      setToken(parsedData.token || "");

      if (parsedData.token === "") return;
      // Fetch messages from the backend
      fetchMessages(parsedData.token);
    }
  }, [token]);

  const addChatMessage = (data) => {
    setChatMessages((prev) => [...prev, data]);
  };
  const changeUser = (a) => {
    setUser(a);
  };
  const changeToken = (tk) => {
    setToken(tk);
  };
  const logout = () => {
    setChatMessages([]);
    setUser(null);
    setToken("");
    clearStorage();
  };

  return (
    <Context.Provider
      value={{
        token,
        user,
        changeUser,
        changeToken,
        chatMessages,
        addChatMessage,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
