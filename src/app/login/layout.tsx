
import { ReactNode } from "react";
import Login from "@/components/login/login";



export default function LoginLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
      <Login/>
      {children}
      </>
    )
  }