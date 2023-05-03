import React, { useState } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import './mic.scss'


export default function Mic() {
  const [dbResult, setDbResult] = useState("Noise level: db")
  const [start,setStart] = useState(false);
  const [startBtn,setStartBtn] = useState(true);
  const handleStart = ()=>{
    setStart(true);
    setStartBtn(false)
    // Create an AudioContext object
    const audioContext = new AudioContext();
    // request to access user microphone 
    navigator.mediaDevices.getUserMedia({audio:true})
    .then((stream) => {
    /* use the stream */
    // create a microphone input 
    const microphone = audioContext.createMediaStreamSource(stream);
    // Create an analyser node to process the audio data
    const analyser = audioContext.createAnalyser();
    analyser.fftSize=2048;
    microphone.connect(analyser);
    // Create a buffer to store the frequency data
    const frequencyData = new Float32Array(analyser.frequencyBinCount);

    // create a function to get data in decibel 
    const calculateNoiseLevel = ()=>{
      analyser.getFloatFrequencyData(frequencyData);
      let sum = 0;
      for (let i = 0; i < frequencyData.length; i++) {
        sum += frequencyData[i] ** 2;
      }
      const averagePower = sum / frequencyData.length;
      
      // Convert the average power to dB
      const referencePower = 1; // 1 Pascal square (Pa^2)
      const calibrateddB = 10 * Math.log10(averagePower / referencePower);
      
      setDbResult(`Noise level: ${calibrateddB.toFixed(2)} dB`);
    }


    
    // Update the noise level display every 100 milliseconds
    setInterval(() => {
      calculateNoiseLevel();
    }, 100);

  }).catch((err) => {
    console.log(err)
  });

  }
  const handleStop = ()=>{
    setStart(false);
    setStartBtn(true)
    window.location.reload(true)
  }
  return (
    <div className='container'>
      <h2 className='my-2 text-center text-white'>Click on Start to track the Noise level</h2>
      <div className="main">
        <div className="start btn btn-primary">
          {startBtn &&<span onClick={handleStart}>Start {<PlayCircleOutlineIcon/>}</span>}
        </div>
        <div className="stop btn btn-primary">
        {start && <span onClick={handleStop}>Stop {<StopCircleOutlinedIcon/>}</span>}
        </div>
      </div>
     {start && <div className="cont">
      <button id="speech" className="btn-me">
      <i className="fa fa-microphone micIco" aria-hidden="true"></i>
        </button>
      <div className="pulse-ring"></div>
      </div>}

     {start&&
      <div className="outputContent">
        <span dangerouslySetInnerHTML={{__html:`${dbResult}`}}></span>
      </div>
      }
    </div>
  )
}
