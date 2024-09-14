import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import NavDrawer from "../components/drawer";

const Notify = () => {
  const [navTab, setNavTab] = useState(false);
  const [open, setOpen] = useState(false);
  const notify = useSelector((state) => state.notify);
  return (
    <>
      <NavDrawer setOpen={setOpen} open={open} />
      <main
        style={{ overflowY: "hidden" }}
        className="lg:flex w-[100%] bg-[#eee] pl-[60px] h-[100vh]"
      >
        <header>
          <h2>All Notification</h2>
        </header>
      </main>
    </>
  );
};

export default Notify;
