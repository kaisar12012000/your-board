import React, { useEffect, useState } from 'react';
import "./styles/toolbar.css";
import RectangleIcon from '@mui/icons-material/Rectangle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import { CIRCLE_TOOL, ERASER_TOOL, LINE_TOOL, PENCIL_TOOL, RECTANGLE_TOOL, TEXT_TOOL, TRIANGLE_TOOL } from './helpers/constants';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export default function Toolbar(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showTools, setShowTools] = useState(false)

    const getDim = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", getDim)

        return () => {
            window.removeEventListener("resize", getDim)
        }
    }, [windowWidth])

    return (
        <div className={'toolbar'}>
            {windowWidth > 970 ? <><span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <RectangleIcon onClick={() => props.setToolType(RECTANGLE_TOOL)} className={props.toolType === RECTANGLE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Rectangle</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <RadioButtonUncheckedIcon onClick={() => props.setToolType(CIRCLE_TOOL)} className={props.toolType === CIRCLE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Circle</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <ChangeHistoryIcon onClick={() => props.setToolType(TRIANGLE_TOOL)} className={props.toolType === TRIANGLE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Triangle</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <HorizontalRuleIcon onClick={() => props.setToolType(LINE_TOOL)} className={props.toolType === LINE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Line</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <CreateIcon onClick={() => props.setToolType(PENCIL_TOOL)} className={props.toolType === PENCIL_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Sketch</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <TitleIcon onClick={() => props.setToolType(TEXT_TOOL)} className={props.toolType === TEXT_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Text</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <svg onClick={() => props.setToolType(ERASER_TOOL)} className={props.toolType === ERASER_TOOL ? "active" : "tool-icon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/></svg><span class="icon-name">Eraser</span>
            </span> </> : <>{
                showTools ? <>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <CloseIcon onClick={() => setShowTools(false)} className="tool-icon" /><span class="icon-name">Close Menu</span>
            </span>    
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <RectangleIcon onClick={() => props.setToolType(RECTANGLE_TOOL)} className={props.toolType === RECTANGLE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Rectangle</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <RadioButtonUncheckedIcon onClick={() => props.setToolType(CIRCLE_TOOL)} className={props.toolType === CIRCLE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Circle</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <ChangeHistoryIcon onClick={() => props.setToolType(TRIANGLE_TOOL)} className={props.toolType === TRIANGLE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Triangle</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <HorizontalRuleIcon onClick={() => props.setToolType(LINE_TOOL)} className={props.toolType === LINE_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Line</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <CreateIcon onClick={() => props.setToolType(PENCIL_TOOL)} className={props.toolType === PENCIL_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Sketch</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <TitleIcon onClick={() => props.setToolType(TEXT_TOOL)} className={props.toolType === TEXT_TOOL ? "active" : "tool-icon"} /><span class="icon-name">Text</span>
            </span>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <svg onClick={() => props.setToolType(ERASER_TOOL)} className={props.toolType === ERASER_TOOL ? "active" : "tool-icon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/></svg><span class="icon-name">Eraser</span>
            </span> </> : <>
            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <MenuIcon onClick={() => setShowTools(true)} className='tool-icon' /><span class="icon-name">Show tools</span>
            </span>
            </>
            }</>}
        </div>
    )
}
