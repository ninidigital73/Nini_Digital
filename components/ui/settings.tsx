"use client";

import * as Toast from "@radix-ui/react-toast";
import { useState, useEffect } from "react";

interface SettingsData {
  name: string;
  email: string;
  company: string;
  phone: string;
  notifications: boolean;
}

export default function Settings() {
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    notifications: true,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem("nini_settings");
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    }
  }, []);

  const handleSaveSettings = (): void => {
    // Save settings to localStorage
    localStorage.setItem("nini_settings", JSON.stringify(settings));
    
    // Update user session email if it changed
    const storedUser = localStorage.getItem("nini_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        user.email = settings.email;
        localStorage.setItem("nini_user", JSON.stringify(user));
      } catch (e) {
        console.error("Failed to update user session:", e);
      }
    }

    console.log("Settings saved! Opening toast..."); // Debug log
    setToastOpen(true); // show snackbar
  };

  return (
    <Toast.Provider swipeDirection="right">
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Name"
              value={settings.name}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  name: e.target.value.replace(/[^A-Za-z ]/g, ""),
                }))
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={settings.email}
              onChange={(e) =>
                setSettings((s) => ({ ...s, email: e.target.value }))
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Company</label>
            <input
              type="text"
              placeholder="Company"
              value={settings.company}
              onChange={(e) =>
                setSettings((s) => ({ ...s, company: e.target.value }))
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Phone</label>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Phone Number"
              value={settings.phone}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  phone: e.target.value.replace(/\D/g, ""),
                }))
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
            />
          </div>
          
          <div className="md:col-span-2 flex items-center gap-3">
            <label className="text-sm text-gray-600">Email Notifications</label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  notifications: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-[#6B46C1] to-[#38B2AC] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow"
          >
            Save Changes
          </button>
        </div>
      </div>

      <Toast.Root
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={3000}
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl border border-green-500 pointer-events-auto"
        data-radix-toast
      >
        <Toast.Title className="font-medium text-base">
          ✓ Changes saved successfully!
        </Toast.Title>
      </Toast.Root>

      {/* THIS CONTROLS POSITION */}
      <Toast.Viewport className="fixed bottom-5 right-5 flex flex-col gap-2 w-96 max-w-full outline-none z-[9999] pointer-events-none" />
    </Toast.Provider>
  );
}
