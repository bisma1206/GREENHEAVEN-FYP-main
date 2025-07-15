import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const backendUrl = "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);

  return <UserContext.Provider value={{ user, setUser, backendUrl, token }}>{children}</UserContext.Provider>;
};

export {UserContext, UserProvider}