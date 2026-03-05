// export default function AdminSection() {
//   return (
//     <section className="p-8">
//       <h2 className="text-2xl font-bold">Welcome to the Admin Panel</h2>
//       <p>This content is coming from components/sections/admin.tsx</p>
//     </section>
//   );
// }
"use client"; // Fix: Mark as a Client Component to use useState/useEffect

import React, { useState, useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import {
  MessageSquare,
  Home,
  Settings,
  User,
  TrendingUp,
  Users,
  CreditCard,
  LogOut,
  AlertCircle,
} from "lucide-react";
import { LoginComponent } from "./login";
import { Sarala } from "next/font/google";
interface Inquiry {
  id: number;
  date: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: "read" | "unread";
  response?: string | null;
  responseDate?: string | null;
}

interface UserSession {
  email: string;
  isLoggedIn: boolean;
}

const NiNiDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    notifications: true,
  });

  // Check authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("nini_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isLoggedIn) {
        setIsAuthenticated(true);
        setUserSession(user);
        setSettings((s) => ({ ...s, email: user.email ?? s.email }));
      }
    }

    // Load inquiries from localStorage
    const storedInquiries = localStorage.getItem("nini_inquiries");
    if (storedInquiries) {
      try {
        const parsedInquiries = JSON.parse(storedInquiries);
        setInquiries(parsedInquiries);
      } catch (e) {
        setInquiries([]);
      }
    } else {
      setInquiries([]);
    }

    // Load settings from localStorage
    const storedSettings = localStorage.getItem("nini_settings");
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        // ignore parse error
      }
    }
  }, []);

  const handleLogin = (credentials: { email: string; password: string }) => {
    setIsAuthenticated(true);
    setUserSession({ email: credentials.email, isLoggedIn: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("nini_user");
    setIsAuthenticated(false);
    setUserSession(null);
  };

  const markAsRead = (id: number) => {
    const updatedInquiries = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: "read" as const } : inq,
    );
    setInquiries(updatedInquiries);
    localStorage.setItem("nini_inquiries", JSON.stringify(updatedInquiries));
  };

  const deleteInquiry = (id: number) => {
    const updatedInquiries = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updatedInquiries);
    localStorage.setItem("nini_inquiries", JSON.stringify(updatedInquiries));
  };

  const handleOpenInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setResponseText(inq.response ?? "");
  };

  const handleCloseInquiry = () => {
    setSelectedInquiry(null);
    setResponseText("");
  };

  const handleSendResponse = () => {
    if (!selectedInquiry) return;
    const text = responseText.trim();
    if (!text) return;
    setIsSendingResponse(true);
    const updated = inquiries.map((i) =>
      i.id === selectedInquiry.id
        ? {
            ...i,
            response: text,
            responseDate: new Date().toISOString(),
            status: "read" as const,
          }
        : i,
    );
    setInquiries(updated);
    localStorage.setItem("nini_inquiries", JSON.stringify(updated));
    setIsSendingResponse(false);
    setSelectedInquiry(null);
    setResponseText("");
  };

  const handleSaveSettings = () => {
    localStorage.setItem("nini_settings", JSON.stringify(settings));
    setUserSession((prev) =>
      prev ? { ...prev, email: settings.email } : prev,
    );
    setToastOpen(true);
  };

  // Calculate statistics
  const totalLeads = inquiries.length;
  const totalRevenue = Math.round(totalLeads * 850); // ₹850 per lead average (demo)
  const totalSales = Math.round(totalLeads * 0.42); // 42% conversion rate
  const unreadCount = inquiries.filter((inq) => inq.status === "unread").length;

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return (
    <Toast.Provider swipeDirection="right">
    <div
      className="flex min-h-screen font-['Quicksand'] text-gray-800"
      style={{ backgroundColor: "#F7F5FA" }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white/40 backdrop-blur-lg border-r border-white/30 flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/nini_logo.png"
            alt="NiNi Digital Logo"
            className="h-30 w-auto"
          />
        </div>

        <nav className="space-y-2">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            active={activeNav === "Home"}
            onClick={() => setActiveNav("Home")}
          />
          <NavItem
            icon={<MessageSquare size={20} />}
            label="Messages"
            active={activeNav === "Messages"}
            onClick={() => setActiveNav("Messages")}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            active={activeNav === "Settings"}
            onClick={() => setActiveNav("Settings")}
          />
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-10 shrink-0 border-b border-white/30 bg-white/40 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <div className="flex items-center gap-6">
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-semibold text-red-600">
                  {unreadCount} Unread
                </span>
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">
                  {userSession?.email}
                </p>
                <p className="text-xs text-gray-500">Admin User</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B46C1] to-[#38B2AC] flex items-center justify-center text-white border-2 border-white/40 shadow-lg">
                <User size={20} />
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="px-10 space-y-8 pb-10">
          {activeNav === "Home" && (
            <>
              {/* KPI Stat Cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <StatCard
                  label="Total Revenue"
                  value={`₹${totalRevenue.toLocaleString()}`}
                  icon={<CreditCard size={24} />}
                  color="from-[#6B46C1] to-[#805AD5]"
                />
                <StatCard
                  label="Total Leads"
                  value={totalLeads.toString()}
                  icon={<Users size={24} />}
                  color="from-[#38B2AC] to-[#4FD1C5]"
                />
                <StatCard
                  label="Total Sales"
                  value={totalSales.toString()}
                  icon={<TrendingUp size={24} />}
                  color="from-[#ED8936] to-[#F6AD55]"
                />
              </section>
            </>
          )}

          {activeNav === "Messages" && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="md:col-span-1 bg-white/60 p-4 rounded-2xl border border-white/30 shadow-sm max-h-[60vh] overflow-y-auto">
                <h3 className="font-bold mb-4">Inquiries</h3>
                {inquiries.length === 0 && (
                  <p className="text-sm text-gray-500">No inquiries yet.</p>
                )}
                <ul className="space-y-3">
                  {inquiries.map((i) => (
                    <li
                      key={i.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedInquiry?.id === i.id
                          ? "bg-white/20 ring-1 ring-white/40"
                          : "hover:bg-white/10"
                      }`}
                      onClick={() => handleOpenInquiry(i)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="font-semibold">{i.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[180px]">
                            {i.message}
                          </div>
                        </div>
                        <div className="text-xs text-right">
                          <div className="text-gray-400">
                            {new Date(i.date).toLocaleDateString()}
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-2 py-1 rounded-full text-[11px] ${
                                i.status === "unread"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {i.status === "unread" ? "Unread" : "Read"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2 bg-white/60 p-6 rounded-2xl border border-white/30 shadow-sm max-h-[60vh] overflow-y-auto">
                {!selectedInquiry ? (
                  <div className="text-center text-gray-500">
                    Select a message to view and respond.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">
                          {selectedInquiry.name}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {selectedInquiry.email}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(selectedInquiry.date).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      {selectedInquiry.message}
                    </div>
                    <div>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows={6}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                        placeholder="Write response here..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSendResponse}
                        disabled={!responseText.trim() || isSendingResponse}
                        className="bg-gradient-to-r from-[#6B46C1] to-[#38B2AC] text-white px-4 py-2 rounded-lg disabled:opacity-60 hover:shadow-lg transition-shadow"
                      >
                        {isSendingResponse ? "Sending..." : "Send Response"}
                      </button>
                      <button
                        onClick={() => {
                          if (selectedInquiry) {
                            markAsRead(selectedInquiry.id);
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                      >
                        Mark Read
                      </button>
                      <button
                        onClick={() => {
                          if (selectedInquiry) {
                            deleteInquiry(selectedInquiry.id);
                            setSelectedInquiry(null);
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleCloseInquiry}
                        className="ml-auto px-4 py-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                    {selectedInquiry.response && (
                      <div className="text-sm text-green-700 font-semibold">
                        Response sent on{" "}
                        {selectedInquiry.responseDate
                          ? new Date(
                              selectedInquiry.responseDate,
                            ).toLocaleString()
                          : ""}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {activeNav === "Settings" && (
            <section className="bg-white/60 p-6 rounded-2xl border border-white/30 shadow-sm pt-6">
              <h3 className="font-bold mb-4">Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 bg-gradient-to-br from-white/60 to-white/40 p-6 rounded-2xl flex flex-col items-center text-center border border-white/30">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#6B46C1] to-[#38B2AC] flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {(settings.name || userSession?.email || "A")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div className="font-semibold">
                    {settings.name || "Admin User"}
                  </div>
                  <div className="text-xs text-gray-500 break-all">
                    {settings.email || userSession?.email}
                  </div>
                  <div className="mt-4 w-full">
                    <button
                      onClick={() => {
                        localStorage.removeItem("nini_user");
                        handleLogout();
                      }}
                      className="w-full bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 col-span-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      {/* <input
                        value={settings.name}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, name: e.target.value }))
                        }
                        className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      /> */}
                      <input
  type="text"
  placeholder="Name"
  pattern="[A-Za-z ]*"
  value={settings.name}
  onChange={(e) =>
    setSettings((s) => ({
      ...s,
      name: e.target.value.replace(/[^A-Za-z ]/g, "") // removes non-letters
    }))
  }
  className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
/>

                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      {/* <input
                        value={settings.email}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, email: e.target.value }))
                        }
                        className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      /> */}

                      <input
                        type="email"
                        placeholder="Email"
                        value={settings.email}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, email: e.target.value }))
                        }
                        className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      />
                    </div>

                    {/* <div>
                      <label className="text-sm text-gray-600">Company</label>
                      <input
                        value={settings.company}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            company: e.target.value,
                          }))
                        }
                        className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      />
                    </div> */}
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      {/* <input
                        value={settings.phone}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, phone: e.target.value }))
                        }
                        className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      /> */}
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Phone Number"
                        value={settings.phone}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            phone: e.target.value.replace(/\D/g, ""), // removes non-numeric characters
                          }))
                        }
                        className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center gap-3">
                      <label className="text-sm text-gray-600">
                        Email Notifications
                      </label>
                      <input
                        type="checkbox"
                        checked={!!settings.notifications}
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

                  <div className="mt-6 border-t border-white/30 pt-4">
                    <h4 className="font-semibold mb-2">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        placeholder="Current password"
                        type="password"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      />
                      <input
                        placeholder="New password"
                        type="password"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      />
                      <input
                        placeholder="Confirm new password"
                        type="password"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleSaveSettings}
                      className="bg-gradient-to-r from-[#6B46C1] to-[#38B2AC] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        const saved = localStorage.getItem("nini_settings");
                        if (saved) setSettings(JSON.parse(saved));
                      }}
                      className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
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

    <Toast.Viewport className="fixed bottom-5 right-5 flex flex-col gap-2 w-96 max-w-full outline-none z-[9999] pointer-events-none" />
    </Toast.Provider>
  );
};

// Stat Card Component
type StatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
};
const StatCard = ({ label, value, icon, color }: StatCardProps) => (
  <div className="bg-white/60 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    </div>
    <div
      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
    >
      {icon}
    </div>
  </div>
);

// Navigation Item Component
type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};
const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={() => {}}
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
      active
        ? "bg-gradient-to-r from-[#6B46C1] to-[#7c5cd1] text-white shadow-lg"
        : "text-gray-500 hover:bg-white/10 hover:text-[#6B46C1]"
    }`}
  >
    {icon}
    <span className="font-bold">{label}</span>
  </div>
);

export default NiNiDashboard;
