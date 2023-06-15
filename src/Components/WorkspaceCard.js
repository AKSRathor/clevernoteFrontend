import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from '../Context/NoteContext'
import {Link , useNavigate} from 'react-router-dom'

const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

const WorkspaceCard = (props) => {
  const navigate= useNavigate();

  const context = useContext(NoteContext)
  const { newNoteBool, setNewNoteBool, setCurrentNote, addNote, currentNote, content, setContent } = context

  const handleOnChangeCurrentNoteState = async()=>{
    // const currDate = new Date()
    await setCurrentNote({
      topic:props.topic,
      description: props.description,
      _id:props._id,
      date :props.date,
    })
    console.log("Clicked WS", props.description )
    await setContent( props.description )
    await navigate("/note");
  }
  const handleOnNewCreate = ()=>{
    addNote()
    setNewNoteBool(true);
    // props.id = 
  }

  const propsFuctionTopic = ()=>{
    if(props.topic.length>20){
      return "..."
    }
    else return ""
  }
  return (
    <div className='WSCard' onClick={handleOnChangeCurrentNoteState} >
      {props._id &&(
        <>
        <div className="upperSectionWSHead"><h2>{props.topic.slice(0,20) + propsFuctionTopic()}</h2></div>
        <div className="upperSectionWSDesc"><p>{props.description.slice(0,100)}</p></div>
        <div className="upperSectionWSDate"><p>{props.date.slice(8,10)}th {monthArr[props.date.slice(5,7) - 1]} {props.date.slice(0,4)}  </p></div>
        
        </>

      )}
      {!props._id &&(
        <div className='addBlockCard' onClick={handleOnNewCreate}>
          <div className="addBlock">
            <i class="fa-solid fa-notes-medical"></i>
          </div>
            <div className="addNoteBlockCard">Notes</div>
        </div>

      ) }
    </div>
  )
}

export default WorkspaceCard