import React from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/NoteContext'

const NotebookCard = (props) => {

    const context = useContext(NoteContext)

    const {setCurrentNote, setNewNoteBool, setContent}  = context

    const handleOnChangeCurrentNoteState = async()=>{
        const currDate = new Date()
        await setCurrentNote({
          topic:props.topic,
          description: props.description ,
          _id:props._id,
          date :JSON.stringify(currDate),
        })
        // navigate("/note");
        await setNewNoteBool(false)
        console.log("insideth enoobook", props.description)
        setContent(props.description)
      }


    return (

        <div className="noteBookCard" onClick={handleOnChangeCurrentNoteState}>
            <div className="noteBookUpperSection">
                <div className="noteBookTitle">{props.topic}</div>
                <div className="noteBookTag">{props.tag}</div>
            </div>

            <div className="noteBookDesc">
                <p className="noteBookDescPara">
                 <span style={{fontWeight:"bold"}}>Desc: </span>{props.description }
                </p>
            </div>

        </div>

    )
}

export default NotebookCard