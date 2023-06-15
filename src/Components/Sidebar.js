import React from 'react'
import "./Style/Sidebar.css"
import { useContext } from 'react'
import NoteContext from '../Context/NoteContext'
import {Link , useNavigate} from 'react-router-dom'


const myName = "Ayush Kumar Singh Rathor"

const Sidebar = () => {
  const navigate= useNavigate();
  const context = useContext(NoteContext)
  const {tagListState, setTagListState, noteList, setNoteList, tagListClick, currentNote, setCurrentNote, setNewNoteBool, addNote, homePagePickup} = context;

  const HandleOnClickTagList = async()=>{
    tagListClick.current.style.display = "block"

    const tempTagList = []
    await setTagListState([])
    for (let i = 0; i < noteList.length; i++) {
      console.log(tagListState, noteList[i].tag, "is the tag loop")
      if(!tempTagList.includes(noteList[i].tag)){
        
        await tempTagList.push(noteList[i].tag)
      }
      
    }
    // tempTagList.pop()
    console.log("finaltag list temp", tempTagList)
    for (let i = 0; i < tempTagList.length; i++) {
      setTagListState(tagListState => [...tagListState, tempTagList[i]]);
    }

  }

  const handleOnNewCreate = async () => {
    const currDate = new Date()
    addNote()
    await setCurrentNote({
      date: JSON.stringify(currDate),
    })
    setNewNoteBool(true);
    navigate("/note");
  }

  const handleOnVisitSite = async()=>{
    const currDate = new Date()
    addNote()
    await setCurrentNote({
      date: JSON.stringify(currDate),
    })
    setNewNoteBool(true);
    navigate("/notebook")
    if(window.innerWidth <=767){
      window.scrollTo({top:720, behavior:"smooth"})
    }
  }

  const handleOnVisitHome = async()=>{

    await navigate("/")
    // console.log("onpickup")
    if(window.innerWidth <=767){
      window.scrollTo({ top: 720, behavior: 'smooth' });

    }
  }
  

  return (
    <div className='sideBar'>
      {/* <div className="crossBar"><i class="fa-solid fa-xmark"></i></div> */}
      <div className="alignSidebar">
        <div className="NameSide">{myName.slice(0,17)}</div>
        <form className="searchSide"> <input className='searchInputSide' type="text" /> </form>
        <div className="addNewNote"><button onClick={handleOnNewCreate}>New</button></div>
        <div className="sideBarSection">
            <ul>
                <li onClick={handleOnVisitHome} className='sideBarSectionUlLi'><i class="fa-solid fa-house"></i> Home</li>
                <li onClick={handleOnVisitSite} className='sideBarSectionUlLi'><i class="fa-solid fa-book"></i> Notebooks</li>
                <li className='sideBarSectionUlLi' onClick={HandleOnClickTagList}><i class="fa-solid fa-tag" ></i> Tags</li>
            </ul>
        </div>

      </div>

    </div>
  )
}

export default Sidebar