import React, { useState } from "react";
import { MyContext } from "./MyContext";
import {
  SERVER_ADDRESS,
  SOCKET_PORT,
  SERVER_PORT,
} from "../shared_code/consts";
import Shortid from "shortid";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom";
const socket = socketIOClient(SERVER_ADDRESS + ":" + SOCKET_PORT);

const MyProvider = (props) => {
  const [state, setState] = useState({
    currentRoom: "",
    isUserEnteredName: false,
    playerName: "",
    playerId: "",
    playerList: [],
    joinDate: "",
    roomCreationDate: "",
  });
  let history = useHistory();
  socket.on("NewPlayer", (data) => {
    console.log("New Player from socket");
    setState({ ...state, playerList: data.roomPlayers });
  });

  const onNewGame = () => {
    console.log("OnNewGame Pressed");

    const playerId = Shortid.generate();

    const req = { creatorID: playerId };
    axios
      .post(SERVER_ADDRESS + ":" + SERVER_PORT + "/room/create", req)
      .then((res) => {
        const { roomID, ...creationDate } = res.data;
        console.log(`roomID:${roomID}`);
        setState({
          ...state,
          playerId: playerId,
          currentRoom: roomID,
          roomCreationDate: creationDate,
        });

        console.log(state);
      })
      .catch((err) => {
        window.alert(`Server giving us something wrong! ${err}`);
      });

    console.log(state);
  };

  const joinGame = (roomId) => {
    const playerId = Shortid.generate();
    setState({
      ...state,
      currentRoom: roomId,
      playerId: playerId,
    });
    history.push("/room");
  };

  const onNameEntered = (name) => {
    axios
      .get(
        SERVER_ADDRESS +
          ":" +
          SERVER_PORT +
          "/room/join?userID=" +
          state.playerId +
          "&roomID=" +
          state.currentRoom +
          "&playerName=" +
          name
      )
      .then((res) => {
        const { joinDate, roomPlayers, error, errorMessage } = res.data;
        if (error) {
          console.log(errorMessage);
        } else {
          setState({
            ...state,
            isUserEnteredName: true,
            playerName: name,
            joinDate: joinDate,
            playerList: [...roomPlayers],
          });
        }
      });
  };

  const setName = (name) => {
    setState({
      ...state,
      playerName: name,
    });
  };

  return (
    <div>
      <MyContext.Provider
        value={{
          state: state,
          onNewGame: onNewGame,
          onNameEntered: onNameEntered,
          joinGame: joinGame,
          setName: setName,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default MyProvider;
