"use client";

import { Profile } from "@prisma/client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface UserContextData {
  profile: Profile | null;
  setProfile: Dispatch<SetStateAction<Profile | null>>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

function getDataFromLocalStorage() {
  const profile = localStorage.getItem("profile");
  return profile ? (JSON.parse(profile) as Profile) : null;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(
    getDataFromLocalStorage()
  );

  useEffect(() => {
    localStorage.setItem(
      "profile",
      JSON.stringify({ id: profile?.id, title: profile?.title })
    );
  }, [profile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
