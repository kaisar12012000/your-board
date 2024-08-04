import React, { useState, useRef, useEffect } from 'react'
import {v4 as uuid4} from "uuid";
import Toolbar from './toolbar'
import Page, { convertToPdf } from './page'
import AddIcon from '@mui/icons-material/Add';
import "./styles/notebook.css"
import { LINE_TOOL, RECTANGLE_TOOL, CIRCLE_TOOL, TRIANGLE_TOOL, PENCIL_TOOL, TEXT_TOOL, ERASER_TOOL } from './helpers/constants';
import { SketchPicker } from "react-color";
import { Download } from '@mui/icons-material';
import { usePDF } from 'react-to-pdf';
const reactangleTool = "./Images/rectangle-tool.png";
const circleTool = "./Images/drawing-compass.png";
const pencilTool = "./Images/pencil-tool.png";
const lineTool = "./Images/line-tool.png";
const triangleTool = "./Images/triangle-tool.png";
const textTool = "./Images/text-tool.png";
const eraserTool = "./Images/eraser.png";

const cursorUri = {
    "RECTANGLE_TOOL" : reactangleTool, "CIRCLE_TOOL" : circleTool, "PENCIL_TOOL": pencilTool, "LINE_TOOL": lineTool, "TRIANGLE_TOOL": triangleTool, "TEXT_TOOL": textTool, "ERASER_TOOL": eraserTool
}

export default function Notebook() {
    const [toolType, setToolType] = useState(LINE_TOOL)
    const [color, setColor] = useState("#000")
    const [sketchPickerOpen, setSketchPickerOpen] = useState(false)
    const [pages, setPage] = useState([{
        pageId: "id-000",
    }])
    
    const [cursorCordinates, setCursorCordinates] = useState({
        x: 0, y: 0
    })

    const { toPDF, targetRef } = usePDF({
        filename: uuid4()+".pdf",
        page: {
            orientation: "landscape"
        }
    })

    useEffect(() => {
        window.scrollBy({
            behavior: "smooth",
            top: window.innerHeight
        })
        // pages.forEach(page => {
        //     convertToPdf(page.pageId)
        // })
    }, [pages])

    const addPage = () => {
        const pageId = uuid4()
        setPage(state => [...state, {pageId}])
    }

    const downloadHandler = () => {
        toPDF()
    }
    
    return (
        <div style={{
            cursor : `url(${cursorUri[toolType]}), auto`
         }} >
            {/* <div style={{
                position: "fixed",
                zIndex: 1,
                top: cursorCordinates.y + 2.5,
                left: cursorCordinates.x 
            }} id="mousePointer" className='mouse-pointer'>
                <img src={cursorUri[toolType]} alt='mouse-pointer' style={{
                    width: 30, height: 30,
                }} draggable="false" />
            </div> */}
            <div className='top-row'>
                <Toolbar toolType={toolType} setToolType={setToolType} />
                <button onClick={downloadHandler} className='download-btn'>
                    <Download />
                </button>
            </div>
            <div ref={targetRef}>
            {pages.map((page, index) =>(<Page cursorCordinates={cursorCordinates} setCursorCordinates={setCursorCordinates} toolType={toolType} setToolType={setToolType} color={color} key={page.pageId} pageId={page.pageId} pageNum={index+1} />))}
            </div>
            <div className='bottom-row'>
                {/* <div>
                    <button onClick={addPage} className='add-btn'>
                        <AddIcon />
                    </button>
                    <span class="helper">Add page</span>
                </div> */}
                <div>
                    {!sketchPickerOpen ? <><div onClick={() => setSketchPickerOpen(true)} className='color-change' style={{ border: "1.5px solid #333", borderRadius: 10, padding: 10, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                        <span style={{ backgroundColor: `${color}`, width: "100%", height: "100%", borderRadius: 5 }}></span>
                    </div><span class="icon-name">Change the color to your choice</span></> :
                    <>
                    <SketchPicker color={color} onChange={(c) => setColor(c?.hex)} />
                    <button style={{
                        border: "none", backgroundColor: "#5FB303", color: "#fff", borderRadius: 10, margin: "10px auto", padding: 10
                    }} onClick={() => setSketchPickerOpen(false)}>
                        Done
                    </button>
                    </>}
                </div>
            </div>
        </div>
    )
}
