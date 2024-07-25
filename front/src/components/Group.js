import { useState } from "react";
import { Box, Stack, Avatar, Modal, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, getChats } from "../store/actions/chatAction";

const Group = ({ group, setGroup }) => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  // const [searchValue, setSearchValue] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);

  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.search);

  const findUser = (e) => {
    setInput(e.target.value);
    dispatch(getChats(e.target.value));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createGroup({ users: selectedUserId, name }));
  };

  const addHandler = (item) => {
    if (!selectedUserId.includes(item._id)) {
      setSelectedUserId([...selectedUserId, item._id]);
      setSelectedUsers([...selectedUsers, item]);
    }
  };

  const removeHandler = (item) => {
    setSelectedUserId(selectedUserId.filter((id) => id !== item._id));
    setSelectedUsers(selectedUsers.filter((user) => user._id !== item._id));
  };

  return (
    <Modal open={group} onClose={() => setGroup(false)}>
      <Box className=" mx-auto py-2 mt-20 border-0 outline-0 w-[320px] bg-white flex flex-col justify-center items-center">
        <div className="text-center font-bold font-size-xl">Create Group</div>
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md mb-1 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Enter your group name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="relative pb-2 block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
              onChange={(e) => findUser(e)}
            />
          </label>
          <Button
            variant="contained"
            className="flex font-white-900 p-2 float-right clear-both bg-voilet-300 rounded"
          >
            Create
          </Button>
        </form>
        <div className="flex">
          {selectedUsers &&
            selectedUsers.map((user) => (
              <div
                style={{ fontSize: "12px" }}
                key={user._id}
                onClick={() => removeHandler(user)}
                className="p-[3px] text-white mx-1 bg-green-300 rounded"
              >
                {user.name} X
              </div>
            ))}
        </div>
        <Stack style={{ width: "100%" }} spacing={2}>
          {!search ? (
            input.length < 1 ? (
              <div>Please Enter user names</div>
            ) : (
              <div>Users not found</div>
            )
          ) : (
            search.map((user) => (
              <div
                key={user._id}
                className="w-full flex hover:text-white hover:bg-blue-200 font-bold p-2 w-full justify-between"
                user={user}
                onClick={() => addHandler(user)}
              >
                <div className="flex items-center w-full">
                  <div className="">
                    <Avatar />
                  </div>
                  <div className="px-2 font-size-md">{user.name}</div>
                </div>
                <div className="">
                  <MoreVertIcon />
                </div>
              </div>
            ))
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default Group;
