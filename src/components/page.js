import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import "./styles/page.css";
import { RECTANGLE_TOOL, CIRCLE_TOOL, PENCIL_TOOL, LINE_TOOL, TRIANGLE_TOOL, TEXT_TOOL, ERASER_TOOL } from './helpers/constants';
import rough from "roughjs/bundled/rough.esm";
// import reactangleTool from "./Images/rectangle-tool.png";
// import circleTool from "./Images/drawing-compass.png";
// import pencilTool from "./Images/pencil-tool.png";
// import lineTool from "./Images/line-tool.png";
// import triangleTool from "./Images/triangle-tool.webp";
// import textTool from "./Images/text-tool.png";
// import eraserTool from "./Images/eraser.png";

// const cursorUri = {
//     "RECTANGLE_TOOL" : reactangleTool, "CIRCLE_TOOL" : circleTool, "PENCIL_TOOL": pencilTool, "LINE_TOOL": lineTool, "TRIANGLE_TOOL": triangleTool, "TEXT_TOOL": textTool, "ERASER_TOOL": eraserTool
// }

export const convertToPdf = (id) => {
    const canvas = document.getElementById(id)
    console.log(canvas)
}

// let str = "";
// let oldText = "";
const gen = rough.generator()

const midPointBtw = (p1, p2) => {
    return {
        x: p1.x + (p1.x+p2.x)/2,
        y: p1.y + (p1.y+p2.y)/2
    }
}

export const adjustElementCoordinates = (element) => {
    const { type, x1, y1, x2, y2 } = element;
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
};

const createElement = (id, x1, y1, x2, y2, toolType, color) => {
    // console.log(color)
    let roughEle;
    switch (toolType) {
        case LINE_TOOL:
            roughEle = gen.line(x1, y1, x2, y2, {
                stroke: color,
                roughness: 0
            })
            return {
                id, x1, y1, x2, y2, roughEle, toolType
            }
        case RECTANGLE_TOOL:
            roughEle = gen.rectangle(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1), {
                roughness: 0,
                stroke: color
            })
            return {
                id, x1, y1, x2, y2, roughEle, toolType
            }
        case CIRCLE_TOOL:
            roughEle = gen.circle(x1, y1, Math.abs(x2-x1), {
                roughness: 0,
                stroke: color
            })
            return {
                id, x1, y1, x2, y2, roughEle, toolType
            }
        case TRIANGLE_TOOL:
            roughEle = gen.polygon([[x1,y1], [x1,y2], [x2, y2]], {
                roughness: 0,
                stroke: color
            })
            return {
                id, x1, y1, x2, y2, roughEle, toolType
            }
        default:
            return {
                id, x1, y1, x2, y2, roughEle, toolType
            }       
    }
}

export default function Page(props) {
    const [elements, setElements] = useState([])
    const [isDrawing, setIsDrawing] = useState(false)

    const [points, setPoints] = useState([])
    const [path, setPath] = useState([])
    const [texts, setTexts] = useState([])
    
    const [action, setAction] = useState("none");
    const [selectedElement, setSelected] = useState(null)
    const [textEntry, setTextEntry] = useState({
        text: "", id: 0
    }) 
    const [clientCoordinates, setClientCoordinates] = useState({
        x: 0, y: 0
    })
    const [isWriting, setIsWriting] = useState(false)
    const [str, setStr] = useState("");

    useLayoutEffect(() => {
        const canvas = document.getElementById(`canvas-${props.pageId}`);

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";

        context.save();

        const drawPath = () => {
            // console.log(path)
            path.forEach((stroke, index) => {
                context.beginPath();
                // console.log(stroke)
                stroke.forEach((point, i) => {
                    var midPoint = midPointBtw(point.clientX, point.clientY);
                    // console.log(point.color, point.size)
                    context.lineWidth = point.size;
                    context.strokeStyle = point.color;
                    context.quadraticCurveTo(
                        point.clientX,
                        point.clientY,
                        midPoint.x,
                        midPoint.y
                    );
                    context.lineTo(point.clientX, point.clientY);
                    context.stroke();
                })
                context.closePath();
                context.save();
            });
        }

        const roughCanvas = rough.canvas(canvas);

        elements.forEach((ele) => {
            context.globalAlpha = "1";
            roughCanvas.draw(ele?.roughEle);
        })

        if (texts !== undefined) {
            texts.forEach(textEle => {
                context.font = "28px serif"
                context.fillStyle = textEle.color
                context.fillText(textEle?.str, textEle?.x, textEle?.y)
            })
        }

        
        if (path !== undefined) drawPath();

        context.font = "18px serif"
        context.fillStyle = "#000"
        context.fillText(props?.pageNum,window.innerWidth/2,window.innerHeight*.95-25)

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

    }, [elements, path, texts]);

    // const keyListener = (event) => {
    //     event.preventDefault()
    //     const validChars = [
    //         "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9", " ", 
    //         `\``,`~`,`!`,`@`,`#`,`$`,`%`,`^`,`&`,`*`,`(`,`)`,`_`,`-`,`=`,`+`,`{`,`}`,`[`,`]`,`\\`,`|`,`:`,`;`,`"`,`'`,`,`,`<`,`.`,`>`,`/`,`?`,
    //     ]
    //     const { key, keyCode } = event;
    //     const context = document.getElementById(`canvas-${props.pageId}`).getContext("2d");
    //     if (keyCode === 13 && key === "Enter") {
    //         // setAction("none")
    //         // props.setToolType(LINE_TOOL)
    //         // setIsDrawing(false)
    //         window.onkeydown = undefined
    //         setTextEntry({text:"", id: Math.floor(Math.random()*1000000000)})
    //         setTexts(state => [...state, {str, ...clientCoordinates, color: props.color}])
    //     } else {
    //         // console.log(key)
    //         if (validChars.includes(key)) {
    //             setTextEntry({text: key, id: Math.floor(Math.random()*1000000000)})
    //             context.font = "28px serif";
    //             context.fillStyle = '#ffffff';
    //             context.fillText(oldText, clientCoordinates.x, clientCoordinates.y)
    //             context.font = "28px serif"
    //             context.fillStyle = props.color;
    //             context.fillText(str+key, clientCoordinates.x, clientCoordinates.y)
    //         } else if (keyCode === 8 && key === "Backspace") {
    //             context.font = "28px serif";
    //             context.fillStyle = '#ffffff';
    //             context.fillText(oldText, clientCoordinates.x, clientCoordinates.y)
    //             str = str.slice(0, str.length-1)
    //             // console.log(str)
    //             context.font = "28px serif"
    //             context.fillStyle = props.color;
    //             context.fillText(str, clientCoordinates.x, clientCoordinates.y)
    //         }
    //     }
    // }

    // useEffect(() => {
    //     // if (action === "writing") {
    //     //     // console.log("Listening...")
    //     //     window.onkeydown = keyListener
    //     // };
    //     console.log(action)
    // }, [action])

    // useEffect(() => {
    //     if (textEntry.length == 0) {
    //         str = textEntry.text
    //     } else {
    //         str += textEntry.text
    //     }
    //     oldText = str;
    //     // console.log(str, textEntry)
    // }, [textEntry])    

    const updateElement = (index, x1, y1, x2, y2, toolType) => {
        const updatedElement = createElement(index, x1, y1, x2, y2, toolType, props.color);
        const elementsCopy = [...elements];
        elementsCopy[index] = updatedElement;
        setElements(elementsCopy);
    };

    const handleMouseDown = (e) => {
        console.log(props.toolType);
        const {clientX, clientY} = e;
        const canvas = document.getElementById(`canvas-${props.pageId}`);
        const context = canvas.getContext("2d");

        const id = elements.length;
        if (props.toolType == PENCIL_TOOL || props.toolType === ERASER_TOOL) {
            setAction("sketching");
            setIsDrawing(true);

            const transperancy = "1.0";
            const newEle = {
                clientX,
                clientY,
                transperancy,
                color: props.toolType === ERASER_TOOL ? "#fff" : props.color, size: props.toolType === ERASER_TOOL ? 8 : 4
            };
            setPoints(state => [...state, newEle])

            context.lineCap = 5;
            context.moveTo(clientX, clientY);
            context.beginPath();
        } else if (props.toolType === TEXT_TOOL) {
            setAction("writing")
            setClientCoordinates({
                x: clientX, y: clientY
            })
            setIsWriting(true)
            setStr("")
            // onKeyDownHandler(e)
        } else {
            setAction("drawing");
            const element = createElement(id, clientX, clientY, clientX, clientY, props.toolType, props.color);

            setElements((prevState) => [...prevState, element]);
            setSelected(element);
            // console.log(elements);
        }
    }

    const handleMouseMove = (e) => {
        const canvas = document.getElementById(`canvas-${props.pageId}`);
        const context = canvas.getContext("2d");
        const { clientX, clientY } = e;
        // console.log(clientX, clientY, props.cursorCordinates)
        props.setCursorCordinates({
            x: clientX, y: clientY
        })
        if (action === "sketching") {
            if (!isDrawing) return;
      
            const transparency = points[points.length - 1].transparency;
            const newEle = { clientX, clientY, transparency, color: props.toolType === ERASER_TOOL ? "#fff" : props.color, size: props.toolType === ERASER_TOOL ? 8 : 4 };
      
            setPoints((state) => [...state, newEle]);
            var midPoint = midPointBtw(clientX, clientY);
            context.lineWidth = props.toolType === ERASER_TOOL ? 8 : 4;
            context.strokeStyle = props.toolType === ERASER_TOOL ? "#fff" : props.color;
            context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y);
            context.lineTo(clientX, clientY);
            context.stroke();
        } else if (action === "drawing") {
            const index = elements.length - 1;
            // console.log(index)
            const { x1, y1 } = elements[index];
      
            updateElement(index, x1, y1, clientX, clientY, props.toolType);
        }
    }

    const handleMouseUp = () => {
        if (action === "drawing") {
            const index = selectedElement.id;
            const { id, toolType, strokeWidth } = elements[index];
            // console.log(id, toolType, strokeWidth, elements[index]);
            const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
            updateElement(id, x1, y1, x2, y2, toolType);
        } else if (action === "sketching") {
            const canvas = document.getElementById(`canvas-${props.pageId}`);
            const context = canvas.getContext("2d");
            context.closePath();
            const element = points;
            setPoints([]);
            setPath((prevState) => [...prevState, element]);
            setIsDrawing(false);
        }
        setAction("none");
    }

    const textChangeHandler = (e) => {
        // console.log(e)
        const key = e.target.value;
        if (key[key.length-1] === "\n") {
            console.log("Enter is pressed");
            setIsWriting(false)
            setTexts(state => [...state, {str, ...clientCoordinates, color: props.color}]);
        } else {
            setStr(key)
        }
    }

    return (
        <div className='main'>
            { isWriting &&<div style={{ position: "absolute", zIndex: 1, top: clientCoordinates.y, left: clientCoordinates.x, color: props.color+" !important", fontSize: "26px", fontFamily: "serif" }} ><textarea value={str} onChange={textChangeHandler} placeholder='Press Enter when done typing. Type here...' cols={30} rows={2}></textarea></div>}
            <canvas
             id={`canvas-${props.pageId}`} 
             width={window.innerWidth} 
             height={window.innerHeight*.98}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
            //  onMouseEnter={onMouseEnterCanvas} onMouseLeave={onMouseLeaveCanvas}
            >
                Canvas
            </canvas>
        </div>
    )
}
