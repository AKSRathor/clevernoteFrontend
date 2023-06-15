import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import "./Style/NotePad.css"
import { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../Context/NoteContext'

const NotePad = (props) => {

  const context = useContext(NoteContext)
  const { mySchedules, checkList, noteList, setNoteList, currentNote, setCurrentNote, newNoteBool, setNewNoteBool, editNote, content, setContent } = context

  // const [currentNote, setcurrentNote] = useState(noteList[0])
  

const handleOnHeadChange = async (e) => {
  
  await setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
  const tempNote = await currentNote
  tempNote.topic = await e.target.value
  
  if (!newNoteBool) {
    for (let i = 0; i < noteList.length; ++i) {
      if (noteList[i]._id === currentNote._id) {
        noteList[i] = await tempNote
      }
    }
    editNote(currentNote._id, tempNote)

  }

  else {
    // console.log("Insiders", newNoteBool)
    // await setNoteList({...noteList, tempNote})
    // console.log("before", noteList)
    // tempNote._id = 12
    setCurrentNote(tempNote)

    setNoteList(noteList => [...noteList, tempNote])
    // console.log("after", noteList)
    await setNewNoteBool(false)
  }

  // console.log(noteList)

}

  
  const placeholder = "Enter text here...";
  
  const handleChangeDesc = async (event) => {
    // console.log("aff ", noteList)

    const newTextContent = event.target.textContent;
    // console.log(newTextContent)
    setCurrentNote({ ...currentNote, description: newTextContent });
    const tempNote = await currentNote
    tempNote.description = await newTextContent
    // console.log(currentNote)
    if (!newNoteBool) {
      for (let i = 0; i < noteList.length; ++i) {
        if (noteList[i]._id === currentNote._id) {
          noteList[i] = tempNote
        }
      }
      editNote(currentNote._id, tempNote)

    }
    else {
      // console.log("Ins_iders", newNoteBool)
      // await setNoteList({...noteList, tempNote})
      // console.log("before", noteList)
      // tempNote._id = 12
      setCurrentNote(tempNote)

      setNoteList(noteList => [...noteList, tempNote])
      // console.log("after", noteList)
      await setNewNoteBool(false)
    }
  };

  const writingFunctP = ()=>{
    console.log(" Inside the writing p", currentNote)
    if(currentNote.description === ""){
      return "Start Writing..."
    }
    else return ""
  }


  return (
    <div className='notePadDiv'>
      <h1> <input placeholder='Your Topic here...' autocomplete="off" className='beforeNotePadHeading' name='topic' type="text" value={currentNote.topic} onChange={handleOnHeadChange} />  </h1>
      
      <div className="startWritingHere">{writingFunctP()}</div>
      <p
        style={{ color: "white" }}
        className='textAtDesc'
        contentEditable={true}
        onInput={handleChangeDesc}
      >
        {content}
      </p>
      
    </div>
  )
}

export default NotePad