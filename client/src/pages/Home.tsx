import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import io from 'socket.io-client'
const socket = io.call(undefined, "http://localhost:3001");

type HomeProps = {}

const Home:FC<HomeProps> = () => {
  
  const [message, setMessage] = useState<string>("")
  const [list, setList] = useState<string[]>([])
  
  const sendMessage = () => {
    socket.emit("send", { message })
    setList((prevState) => [...prevState, message])
  }
  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setList((list) => [...list, data])
    });
    return () => {
      socket.off('receive_message')
    }
  }, [socket]);
  
  
  
  return (
    <div>
      <input value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Submit....</button>
      {list?.map((arr: string, idx: number) => <p key={idx}>{arr}</p>)}
    </div>
  );
};

export default Home;