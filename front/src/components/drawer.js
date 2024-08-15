import {
  Call,
  Chat,
  Close,
  Menu,
  Notifications,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NavDrawer({ open, setOpen, setNavTab }) {
  const listItem = [
    { name: "Chats", url: "/?nav=chats", icon: <Chat /> },
    { name: "Calls", url: "/?nav=calls", icon: <Call /> },
    { name: "Notification", url: "/?nav=notify", icon: <Notifications /> },
  ];

  return (
    <>
      <Drawer variant="permanent" open={open} onClose={() => setOpen(false)}>
        <nav
          style={{ width: open ? "200px" : "60px" }}
          className="nav-drawer bg-[#efefef] flex flex-col items-center h-full justify-between py-[30px]"
        >
          <AppBar
            sx={{
              bgcolor: "#efefef",
              flexDirection: open ? "row-reverse" : "row",
              justifyContent: open ? "unset" : "center",
              left: 0,
              width: open ? "200px" : "60px",
              height: "45px",
              boxShadow: "none",
            }}
          >
            <IconButton className="" onClick={() => setOpen(!open)}>
              {open ? (
                <Close
                  style={{
                    fontSize: "25px",
                  }}
                />
              ) : (
                <Menu style={{ fontSize: "25px" }} />
              )}
            </IconButton>
          </AppBar>
          <List className="pt-[50px]">
            {listItem.map((i) => (
              <ListItem key={i.name} disablePadding sx={{ display: "block" }}>
                <Link to={i.url}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                    }}
                  >
                    <Tooltip title={i.name}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {i.icon}
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText
                      primary={i.name}
                      sx={{ display: open ? "block" : "none" }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <Tooltip title={"Setting"}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Settings />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={"Settings"}
                  sx={{ display: open ? "block" : "none" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to={"/?nav=profile"}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    width: "60px",
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <Tooltip title={"profile"}>
                    <Avatar
                      sx={{
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </Tooltip>
                  <ListItemText
                    primary={"Profile"}
                    sx={{ display: open ? "block" : "none" }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Drawer>
    </>
  );
}

export default NavDrawer;
