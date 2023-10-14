"use client";
import React from "react";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "../app/globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "IMS",
//   description: "Information Management System",
// };

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={inter.className} style={{ display: "contents" }}>
      <SessionProvider>
        <Provider store={store}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          <ToastContainer />
        </Provider>
      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;
