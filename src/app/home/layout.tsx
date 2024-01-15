import { ReactNode } from "react";
import Sidebar from "@/components/home/sideBar";



export default function HomeLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
      <Sidebar/>
      {children}
      </>
    )
  }