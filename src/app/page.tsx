import AppBar from "@/components/AppBar";
import ProjectAdd from "@/components/ProjectAdd";
import SideBar from "@/components/SideBar";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home({ children }: any) {
  return (
    <Box className="grid grid-cols-12">
      <Box className="lg:flex hidden md:flex w-full col-span-2">
        <SideBar />
      </Box>
      <Box className="w-full col-span-12 md:col-span-10 lg:col-span-10">
        <AppBar />
        <ProjectAdd />
      </Box>
    </Box>
  );
}
