import React from 'react'
import "./Style/Taglist.css"
import { useContext } from 'react'
import NoteContext from '../Context/NoteContext'
import { useNavigate } from 'react-router-dom'


const TagsList = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext)
  const {tagListState, tagListClick, setCurrentTagList, addNote, setCurrentNote, setNewNoteBool} = context;

  const handleOnCloseTagList = ()=>{
    tagListClick.current.style.display = "none"
  }

  const handleOnClickTag=async( i )=>{
    console.log("The current tag is ", i)
    const currDate = new Date()
    addNote()
    await setCurrentNote({
      date: JSON.stringify(currDate),
    })
    setNewNoteBool(true);
    setCurrentTagList(i)
    navigate("/notebook");
  }

  const handleOnShowAllClick = async()=>{
    const currDate = new Date()
    addNote()
    await setCurrentNote({
      date: JSON.stringify(currDate),
    })
    setNewNoteBool(true);
    setCurrentTagList("")
    navigate("/notebook");

  }

  return (
    <div ref={tagListClick} className='tagList' >

      <div onClick={handleOnCloseTagList} className="tagListBg"></div>
      <div className="tagNamesList">
        <h1 style={{color:"white"}}>Your Tag List</h1>
        {tagListState.map((i)=>{
          return <div onClick= {()=>{handleOnClickTag(i)}} className="tagNameIs">{i}</div>
        })}
        <div onClick= {handleOnShowAllClick} style={{color:"wheat", fontSize:"1.2em"}} className="tagNameIs">Show All</div>

        {/* {tagListState[0]} */}

        
      </div>
    </div>
  )
}

export default TagsList