"use client";
import { AccountCircle, ExpandMore, More, Reorder } from "@mui/icons-material";
import { Box, Button, Drawer, Menu, MenuItem } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";

const AppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const DrawerList = <SideBar />;
  return (
    <Box className="p-5 w-full flex items-center justify-between md:justify-end lg:justify-end">
      <Box className="flex lg:hidden md:hidden">
        <Button className="text-[#C4C4C4]" onClick={toggleDrawer(true)}>
          <Reorder />
        </Button>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Box>
      <Box className="md:flex hidden lg:flex mr-2 text-[#000000]">
        <Box className="lg:text-normal text-sm">Free Trial | 2 Days Left</Box>
        <Box className="md:text-sm lg:text-sm text-xs text-[#FA782F]">
          {" "} Extend free Trial
        </Box>
      </Box>
      <Button
        id=""
        className="text-[#C4C4C4]"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircle className="h-10 w-10" />
        <ExpandMore />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default AppBar;
