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
      <Notebook />
    </div>
  );
}

export default App;
