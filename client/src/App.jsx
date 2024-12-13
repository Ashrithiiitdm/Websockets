import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import Input from './components/Input';
import StickyHeadTable from './components/StickyHeadTable';

function App() {

  const [score, setScore] = useState({});
  const [scores, setAllScores] = useState([]);


  const socket = io('localhost:3000');
  function connectSocket() {
    socket.on("connection", (socket) => {
      console.log(socket);

    });
  }

  function handleInput(event) {
    let { name, value } = event.target;
    let currObj = { [name]: value };

    setScore((prev) => ({
      ...prev, ...currObj
    }));
  }

  function sendScores() {
    //console.log(score);
    socket.emit("scores", score);

    socket.on("playerScores", (playerScores) => {
      setAllScores(playerScores);
    })

  }

  useEffect(() => {
    connectSocket();
  }, [])

  return (
    <>
      <h1>Multiplayer Dashboard</h1>
      <Input name='name' placeholder='Enter your name' handleInput={handleInput}></Input>
      <Input name='score' placeholder='Enter your score' handleInput={handleInput}></Input>
      <button className='send-scores' onClick={sendScores}>Publish Scores</button>
      <div className="scores-table-container">
        <StickyHeadTable rows={scores} />
      </div>

    </>
  )
}

export default App;
