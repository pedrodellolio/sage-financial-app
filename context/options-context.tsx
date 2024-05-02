"use client";

import { Profile } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface OptionsContextData {
  profile?: Profile;
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;
}

const OptionsContext = createContext<OptionsContextData>(
  {} as OptionsContextData
);
export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  let [profile, setProfile] = useState<Profile>();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (profile) router.push("?p=" + profile?.title.toLowerCase());
  }, [profile, router]);

  return (
    <OptionsContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
export default OptionsContext;
