import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  InputBase,
  Typography,
  IconButton,
  Box,
  Toolbar,
} from "@mui/material";
import { Dropdown, MenuItem, Menu, MenuButton } from "@mui/base/";
import axios from "../store/axios";
import { useSelector, useDispatch } from "react-redux";
import { addUserChat, removeNotify } from "../store/actions/userAction";
import { useNavigate } from "react-router-dom";

import BellIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const nevigate = useNavigate();

  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [searchInp, setSearchInp] = useState("");
  const dispatch = useDispatch();

  const findUser = async (e) => {
    setSearchInp(e.target.value);
    await axios
      .get(`/user/find?search=${e.target.value}`)
      .then((res) => {
        setSearchValue(res.data);
      })
      .catch((err) => {});
  };

  /*useEffect(() => {


  }, [notify]);*/

  const chatOpen = async (item) => {
    await axios.post("/chats/", { userId: item._id }).then((data) => {
      dispatch(addUserChat(data.data));
      nevigate("/chat");
    });
  };

  return (
    <Box>
      <AppBar style={{ boxShadow: "none" }}>
        <Toolbar className=" w-full flex justify-center">
          {search ? (
            <>
              <Dropdown>
                <MenuButton>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      onChange={(e) => findUser(e)}
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </MenuButton>
                <Menu className="bg-blue-50 min-w-[300px] flex flex-col justify-center max-w-[400px] p-2">
                  {searchValue && searchValue.length <= 0 ? (
                    <>
                      <div className="font-normal w-full text-gray-500 text-sm">
                        No results found
                      </div>
                    </>
                  ) : (
                    searchValue.map((item) => {
                      return (
                        <div
                          key={item._id}
                          onClick={() => chatOpen(item)}
                          className="flex items-center w-full p-2 py-3"
                        >
                          <div className="pr-2">
                            <Avatar />
                          </div>
                          <div className="flex">
                            <div className="font-bold text-base">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </Menu>
              </Dropdown>
            </>
          ) : (
            <div className="flex justify-between items-center w-full">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setSearch(true)}
                sx={{ mr: 2 }}
              >
                <SearchIcon />
              </IconButton>
              <span className="text-lg font-medium text-white">Chat App</span>
              <Dropdown>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <BellIcon />
                </IconButton>

                <Menu>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Language settings</MenuItem>
                  <MenuItem>Log out</MenuItem>
                </Menu>
              </Dropdown>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
