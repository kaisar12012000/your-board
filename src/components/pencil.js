import React, {useLayoutEffect, useState, useRef} from 'react'

const pos = {x: 0, y: 0};

export default function PencilTool() {
    const [points, setPoints] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const contextRef = useRef(null);

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        contextRef.current = ctx;

        points.forEach(pnt => {
            contextRef.current.lineTo(pnt.x, pnt.y);
            contextRef.current.stroke()
        })
    }, [points]);

    const startDrawing = (event) => {
        setIsDrawing(true);
        const {clientX, clientY} = event;
        pos.x = clientX;
        pos.y = clientY;
    }

    const draw = (event) => {
        if (!isDrawing) return;

        setPoints(state => [...state, pos]);
        contextRef.current.moveTo(pos.x, pos.y);

        const {clientX, clientY} = event;
        pos.x = clientX;
        pos.y = clientY;
    }

    const finishDrawing = () => {
        setIsDrawing(false);
    }

    return (
        <div>
            <canvas
              id="canvas"
              width={window.innerWidth}
              height={window.innerHeight}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={finishDrawing}
            ></canvas>
        </div>
    )
}
