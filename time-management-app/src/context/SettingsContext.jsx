import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    theme: "dark",
    hideCompleted: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadSettings = async () => {
      const ref = doc(db, "users", user.uid, "settings", "preferences");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setSettings(snap.data());
      }

      setLoading(false);
    };

    loadSettings();
  }, [user]);

  const saveSettings = async (newSettings) => {
    if (!user) return;

    setSettings(newSettings);

    const ref = doc(db, "users", user.uid, "settings", "preferences");
    await setDoc(ref, {
      ...newSettings,
      updatedAt: serverTimestamp(),
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
