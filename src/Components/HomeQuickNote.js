import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import NoteContext from '../Context/NoteContext';
import { useState, useContext } from 'react';

const HomeQuickNote = (props) => {

  const context = useContext(NoteContext)
  const {quickNoteText, setQuickNoteText, editQNote} = context
  // const [textareaheight, setTextareaheight] = useState(1); 

  const handleOnHeightChange = (height)=>{
    // console.log("ehgith gonna change")
    if(props.quickNoteDir===0){

      props.setCurrentHeight0(height + 100)
    }
  }
  
  const handleOnTxtChange = async(e)=>{
    console.log("teh quck note text: ", quickNoteText)
    await setQuickNoteText({ ...quickNoteText, [e.target.name]: e.target.value })
    console.log(e.target.value, "Is the value")
    await editQNote(quickNoteText._id,{description:e.target.value})
  }


  return (
    <div className='homeQuickNote' style={{display:props.quickNoteDir === 0?"block":"none" }}>
        <TextareaAutosize value={quickNoteText.description} onChange={handleOnTxtChange} onHeightChange={handleOnHeightChange} className='homeQNText' name="description" id="quicknote" cols="30" minRows="18" />
    </div>
  )
}

export default HomeQuickNote