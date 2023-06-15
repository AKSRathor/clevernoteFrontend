import React from 'react'
import "./Style/Notebook.css"
import NotebookCard from './NotebookCard'
import NotePad from './NotePad'
import NoteContext from '../Context/NoteContext'
import { useContext } from 'react'

const Notebook = () => {
    
    const context = useContext(NoteContext)
    const { noteList, currentTagList, setCurrentTagList } = context
    const ifTagIs = (i) => {
        if(currentTagList != ""){
            return(i.tag === currentTagList)
        }
        else return(i.tag === i.tag)
    }


    return (
        <div className="completeSectionNotebook">

            <div className='allCardNotebook'>
                {noteList.filter(ifTagIs).map((i)=>{
                    return <NotebookCard i = {i} topic = {i.topic} description = {i.description} key = {i._id} tag = {i.tag} _id = {i._id}/>
                })}
            </div>

            <div className="notePadOnNotebook">
                <NotePad/>
            </div>
        </div>
    )
}

export default Notebook