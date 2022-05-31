import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const { status } = useSession();
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  useEffect(() => {
    if (status === "authenticated")
      axios
        .get("/api/profile")
        .then((res) => setCurrentUserProfile(res.data))
        .catch(() => setCurrentUserProfile(null));
    else setCurrentUserProfile(null);
  }, [status]);

  return (
    <CurrentUserContext.Provider value={{ currentUserProfile }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
