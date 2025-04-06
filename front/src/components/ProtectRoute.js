import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Call, CallEnd } from "@mui/icons-material";
import socket from "./socketContext";
import Peer from "simple-peer";

function ProtectRoute(props) {
  const { user, loading, eError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [incoming, setIncoming] = useState(false);
  const [caller, setCaller] = useState();
  const [ans, setAns] = useState();

  const peer = new Peer();

  const connect = () => {
    // peer.connect(user._id);
    peer.on(
      "open",
      (id) => {
        console.log(id);
        dispatch({ type: "PEER_CONNECTED", payload: { peer, peerId: id } });
      },
      {}
    );
    console.log(peer);
  };

  useEffect(() => {
    user && connect();
    return () => {};
  }, [user]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && !user && eError) {
      navigate("/login");
    }
  }, [user, navigate, loading, eError]);

  useEffect(() => {
    socket.on("income-call", (data) => {
      setCaller(data.user);
      setAns(data.stream);
      setIncoming(true);
    });

    return () => {
      socket.off("income-call");
    };
  }, [socket]);

  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  const deniedCall = () => {
    setIncoming(false);
    socket.emit("call-denied", { user: caller });
  };
  const acceptCall = async () => {
    setIncoming(false);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    socket.emit("call-accept", { user: caller, me: user, stream });
    dispatch({ type: "add_media", payload: stream });
    // });
    navigate("/calls");
  };
  return (
    <>
      {user && (
        <>
          {props.children}
          {caller && (
            <Dialog open={incoming} onClose={() => setIncoming(false)}>
              <DialogTitle>Incoming Call</DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    flexDirection: "column",
                  }}
                >
                  <Avatar sx={{ width: "80px", height: "80px" }} />
                  <Typography className="font-bold text-lg">
                    {caller.name}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ width: "100%" }}>
                <Button onClick={deniedCall} color="error" variant="contained">
                  <CallEnd /> Decline
                </Button>
                <Button onClick={acceptCall} variant="contained">
                  <Call /> Answer
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </>
  );
}

export default ProtectRoute;
