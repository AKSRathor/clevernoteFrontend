import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Style/Home.css"
import WorkspaceCard from './WorkspaceCard'
import HomeQuickNote from './HomeQuickNote'
// import ScheduleBox from './ScheduleBox'
import NoteContext from '../Context/NoteContext'
// import CheckMarksBox from './CheckMarksBox'
import { useNavigate } from 'react-router-dom'
import DropDown from './DropDown'




const Home = () => {
  // const history = useNavigate()
  const navigate = useNavigate()
  const context = useContext(NoteContext)
  const { mySchedules, checkList, noteList, setNoteList, setNewNoteBool, newNoteBool, setCurrentNote, addNote, homePagePickup } = context

  const [currentHeight0, setCurrentHeight0] = useState(357)
  const [currentHeight1, setCurrentHeight1] = useState(357)
  const [currentHeight2, setCurrentHeight2] = useState(357)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef()
  const liRef = useRef()

  useEffect(() => {

    if(!localStorage.getItem("clevertoken")){
      navigate("/login")
    }
    document.addEventListener('click', handleClickOutside)
    console.log("handle outside")

    return () => {
      document.removeEventListener('click', handleClickOutside)

    }
  }, [])
  const [quickNoteDir, setQuickNoteDir] = useState(0)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      dropdownRef.current.style.opacity = "0"
      dropdownRef.current.style.transform = "translateY(-8px)"
      setMenuOpen(false)
    }
  }
  const toggleDropdown = () => {
    if (menuOpen == false) {
      dropdownRef.current.style.opacity = "1"
      dropdownRef.current.style.transform = "translateY(0)"
      setMenuOpen(!menuOpen)
      // setMenuOpen
    }
    else {
      dropdownRef.current.style.opacity = "0"
      dropdownRef.current.style.transform = "translateY(-8px)"
      setMenuOpen(!menuOpen)
    }

  }

  const handleOnNewCreate = async () => {
    const currDate = new Date()
    await setCurrentNote({
      date: JSON.stringify(currDate),
    })
    setNewNoteBool(true);
    navigate("/note");
  }
  const handleOnVisitNotebook = async()=>{
    const currDate = new Date()
    addNote()
    await setCurrentNote({
      date: JSON.stringify(currDate),
    })
    setNewNoteBool(true);
    
    navigate("/notebook")
  }
  const getTheCurrentHeight = ()=>{
    console.log("Insid the current hieght is ")
    if(quickNoteDir === 0){
      return currentHeight0;
    }
    else if(quickNoteDir ===1){
      return currentHeight1
    }
    else if(quickNoteDir === 2){
      console.log("Yes returning ", currentHeight2)
      return currentHeight2
    }
  }




  return (
    <div className='homeTab' ref={homePagePickup} >
      
      <div className="workSpace">
        <div className="alignItemWS">

          <a className="HeadSectionWorkSpace" style={{ display: "flex" }}>
            <button onClick={handleOnVisitNotebook} ><div>NOTES  <i style={{color:"orange"}} class="fa-solid fa-chevron-right"></i></div> </button>
          </a>
          <div className="upperSectionHeaderWS">
            <div className="currentTabWS">
              <a href=''>Recent</a>
            </div>
            <div className="rightSection">
              <button onClick={handleOnNewCreate} className='rightSectionBtn' href=""><i class="fa-solid fa-file"></i></button >
              <button onClick={toggleDropdown} on className='rightSectionBtn' href=""><i class="fa-solid fa-ellipsis"></i></button >
              <div ref={dropdownRef} className="workSpaceMenuDrop">
                {menuOpen && (
                  <DropDown />
                )}

              </div>

            </div>

          </div>
          <div className="cardSection">
            {noteList.map((i) => {
              return <WorkspaceCard i={i} _id={i._id} topic={i.topic} description={i.description} date={i.date} />
            })}
            <WorkspaceCard i={"#entry"} _id={false} topic={""} description={""} date={""} />
          </div>


        </div>
      </div>
      <div className="quickNotes" style={{ height: getTheCurrentHeight()}}>
        <div className="alignItemQN">
          <div className="lowerSectionQN">
            <div className="upperSectionHeaderWS">
              <div className="currentTabWS">
                <h1 className='lowerSectionQNH1'>RECENTLY CAPTURED</h1>
              </div>
              <div className="rightSection">
                <a href=""><i class="fa-solid fa-ellipsis"></i></a>
              </div>

            </div>


          </div>
          <div className="recentCapturedNav">
            <nav>
              <ul className='recentCapUl'>
                <li onClick={() => { setQuickNoteDir(0) }} className='recentCapNavLi'><li ref={liRef} className='recentCapA' href="">Scrap Pad</li></li>
              </ul>
            </nav>
            <div className="allQuickSide">
              <HomeQuickNote quickNoteDir={quickNoteDir} currentHeight0={currentHeight0} setCurrentHeight0={setCurrentHeight0} />
              {/* <div style={{ display: quickNoteDir === 1 ? "block" : 'none' }} className="scheduleBoxDiv">
                {mySchedules.map((i) => {
                  return <ScheduleBox setCurrentHeight1 = {setCurrentHeight1} currentHeight1 = {currentHeight1} sno={i.sno} key={i._id} _id={i._id} i={i} from={i.from} to={i.to} task={i.task} />
                })}
              </div> */}


              {/* <div className="checkListDiv" style={{ display: quickNoteDir === 2 ? "block" : "none" }}>
                {checkList.map((i) => {
                  return <CheckMarksBox currentHeight2 = {currentHeight2} setCurrentHeight2 = {setCurrentHeight2} sno={i.sno} key={i._id} _id={i._id} i={i} tick={i.tick} content={i.content} />
                })}
              </div> */}

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
