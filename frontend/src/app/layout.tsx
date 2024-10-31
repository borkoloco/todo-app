"use client";

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleLogout = () => {
    window.sessionStorage.removeItem("jwt-token");
    router.push("/auth");
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-100 h-10 flex justify-end">
          <button className="mr-5" onClick={handleLogout}>
            Log out
          </button>
        </header>
        <div className="flex flex-col h-screen">{children}</div>
      </body>
    </html>
  );
}
