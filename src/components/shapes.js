import React, {useLayoutEffect, useState} from 'react'
import rough from "roughjs/bundled/rough.esm"

const gen = rough.generator()

const createElement = (x1, y1, x2, y2) => {
    // const roughEle = gen.line(x1, y1, x2, y2);
    const roughEle = gen.line(x1, y1, x2, y2);
    return {
        x1, y1, x2, y2, roughEle
    }
}

export default function ShapesTool() {

    const [elements, setElements] = useState([])
    const [isDrawing, setIsDrawing] = useState(false)

    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const rc = rough.canvas(canvas);

        elements.forEach(ele => rc.draw(ele.roughEle))
    })

    const startDrawing = (event) => {
        setIsDrawing(true)
        const { clientX, clientY } = event;
    
        const newEle = createElement(clientX, clientY, clientX, clientY);

        setElements((state) => [...state, newEle])
    }

    const draw = (event) => {
        if (!isDrawing) return;

        const {clientX, clientY} = event;
        const index = elements.length - 1;
        const {x1, y1} = elements[index];
        const newEle =  createElement(x1, y1, clientX, clientY);
        const copy = [...elements];
        copy[index] = newEle;
        setElements(copy);
    }

    const finishDrawing = () => {
        setIsDrawing(false)
    }

    return (
        <div>
            <canvas
             id='canvas' 
             width={window.innerWidth} 
             height={window.innerHeight}
             onMouseDown={startDrawing}
             onMouseMove={draw}
             onMouseUp={finishDrawing}
            >
                Canvas
            </canvas>
        </div>
    )
}
