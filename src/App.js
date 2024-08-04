// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Notebook from './components/notebook';
// import ShapesTool from './components/shapes';
// import PencilTool from './components/pencil';

function App() {
  const [sizeErr, setSizeErr] = useState(false)
  const [ windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    if (windowWidth <= 900) {
      setSizeErr(true)
    } else {
      setSizeErr(false)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [windowWidth])

  return (
    <div className="App">
      {sizeErr ? <center>
        <h1 style={{ color: "red"}}>
          Error: Opps! It looks like the screen is too small for the app to run.<br></br>
          Please use a device with a screen width greater than 1200 pixels.
        </h1>
      </center> :
      <Notebook />}
    </div>
  );
}

export default App;
