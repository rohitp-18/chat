import React, { useEffect, useRef, useState } from "react";
import socket from "./socketContext";
import Peer from "peerjs";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import peerService from "./peerService";

function VideoCall() {
  const [stream, setStream] = useState();
  const [arr, setArr] = useState([]);
  // const [peerId, setPeerId] = useState();
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [callAns, setCallAns] = useState(false);

  const { media } = useSelector((state) => state.chats);
  const { user, peer, peerId } = useSelector((state) => state.user);

  // const peer = new Peer();
  // const connect = () => {
  //   console.log(peer);
  //   if (user) {
  //     peer.connect(user._id);
  //     peer.on(
  //       "open",
  //       (id) => {
  //         console.log(id);
  //         setPeerId(id);
  //       },
  //       {}
  //     );
  //   }
  // };

  useEffect(() => {
    socket.on("call-pick", async (data) => {
      socket.emit("v-call-picked", { ...data, peerId });
      console.log(peerId);
    });
    return () => {
      socket.off("call-pick");
    };
  }, [socket, peerId]);

  useEffect(() => {
    socket.on("v-call-picked", (data) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.addEventListener("loadedmetadata", () => {
          currentUserVideoRef.current.play();
        });
        const call = peerInstance.current.call(data.peerId, mediaStream);

        if (!call) {
          return;
        }

        console.log(call);

        call.on("stream", (remoteStream) => {
          console.log(remoteStream);
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.addEventListener("loadedmetadata", () => {
            remoteVideoRef.current.play();
          });
        });
      });
    });

    return () => {
      socket.off("v-call-picked");
    };
  }, [socket]);

  // useEffect(() => {
  //   connect();
  //   return () => {
  //     // connect();
  //   };
  // }, []);

  // useEffect(() => {
  //   peerService.peer.addEventListener("track", async (ev) => {
  //     const remoteStream = ev.streams;
  //     console.log("GOT TRACKS!!");
  //     setCallAns(remoteStream[0]);
  //   });
  // }, []);

  var getUserMedia = navigator.getUserMedia;
  useEffect(() => {
    peer &&
      peer.on("call", (call) => {
        console.log(call);

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.addEventListener("loadedmetadata", () => {
              remoteVideoRef.current.play();
            });
          });
        });
      });
    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.addEventListener("loadedmetadata", () => {
        currentUserVideoRef.current.play();
      });
      const call = peerInstance.current.call(remotePeerId, mediaStream);

      if (!call) {
        return;
      }

      console.log(call);

      call.on("stream", (remoteStream) => {
        console.log(remoteStream);
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.addEventListener("loadedmetadata", () => {
          remoteVideoRef.current.play();
        });
      });
    });
  };

  return (
    <>
      <div style={{ overflowY: "scroll" }}>
        <h1>Current user id is {peerId}</h1>
        <input
          type="text"
          value={remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
        />
        <button onClick={() => call(remotePeerIdValue)}>Call</button>
        <div>
          <video height="100px" width="200px" ref={currentUserVideoRef} />
        </div>
        {/* <ReactPlayer
          playing
          muted
          height="100px"
          width="200px"
          url={media || ""}
        />
        {callAns && (
          <>
            <h2>hello</h2>
            <ReactPlayer
              playing
              muted
              height="100px"
              width="200px"
              url={callAns}
            />
          </>
        )} */}
        <div>
          <video height="100px" width="200px" ref={remoteVideoRef} />
        </div>
      </div>
    </>
  );
}

export default VideoCall;
