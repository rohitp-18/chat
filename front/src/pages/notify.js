import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

const Notify = () => {
  const notify = useSelector((state) => state.notify);
  return <>{}</>;
};

export default Notify;
