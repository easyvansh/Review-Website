"use client";

import NavBar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <NavBar />
      {children}
    </AuthContextProvider>
  );
}
