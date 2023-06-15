import React from 'react'
// import CheckMark from './CheckMark'
import { useContext, useState, useEffect } from 'react'
import NoteContext from '../Context/NoteContext'

const CheckMarksBox = (props) => {
  console.log("Insid ethe chekmarks", props.sno)


  const context = useContext(NoteContext)
  const { checkList, setCheckList, lastCheckListValue, setLastCheckListValue } = context
  const [checkTick, setCheckTick] = useState(checkList[props.sno-1].tick)
  const [checkInpPlace, setCheckInpPlace] = useState({

    tick: checkTick,
    content: props.content,
    sno: props.sno,
    uid: props.sno + 1
    
  })

  const handleOnContentChange = (e) => {


    props.setCurrentHeight2(checkList.length*60 + 200 + "px")
    console.log("The current height is ",checkList.length*65 + 200 + "px")

    if (e) {
      console.log("The checktick is ", checkTick)
      console.log("INside the e")

      setCheckInpPlace({ ...checkInpPlace, [e.target.name]: e.target.value })
    }
    let cipTemp = checkInpPlace;
    cipTemp.tick = checkTick

    if (e.target.name === "content") {
      console.log("inside the task field")
      // let cip = checkInpPlace;
      cipTemp.content = e.target.value
      checkInpPlace.content = e.target.value
    }
    else {
      console.log("Insdide the task else field")
      cipTemp.content = mySchedules[props.sno].content
      // checkInpPlace.content = 
    }

    let checkListTemp = checkList;
    // mySchedulesTemp[props.sno] = await scheduleBoxPlace;
    checkListTemp[props.sno] = cipTemp;
    setCheckList(checkListTemp)
    console.log("prp id: ", props._id, " length ", checkList.length)

    if (props._id === checkList[checkList.length - 1]._id) {
      console.log('inside the if')
      setLastCheckListValue(lastCheckListValue + 1);
      setCheckList([...checkList, { sno: lastCheckListValue, content: "", tick:false}])

    }






    console.log("The length of checkList is: ", checkList.length, " The checkList is : ", checkList, " The check TICk si ", checkTick)


    if (checkList.length >= 2 && checkList[checkList.length - 2].content === ""  ) {
      console.log("Schedule length is ", checkList.length)
      // console.log("at ", checkList.length - 2, " from ", checkList[checkList.length - 2].from, " to ", checkList[checkList.length - 2].to, " task ", checkList[checkList.length - 2].task)
      const mst = [...checkList];
      mst.pop();
      setCheckList(mst)
      setLastCheckListValue(lastCheckListValue - 1);
      console.log(checkList)
    }
    if (props.sno < checkList.length - 2 && checkList[props.sno].from === "" && checkList[props.sno].to === "" && checkList[props.sno].task === "") {
      console.log(props.sno, " is empty")
    }





  }
  

  const handleOnTickChange = ()=>{

    
    console.log("Insid ethe tick change")
    let checkListTemp2 = [...checkList];
    checkListTemp2[props.sno].tick = !checkTick
    setCheckTick(!checkTick)
    setCheckList(checkListTemp2)
    console.log("inside the usefeect", checkList)

  }
  return (

    <div>

      <div className="checkListUpper">
        
        <input onClick={handleOnTickChange} autoComplete='off' type='checkbox' className='checkMark' checked = {JSON.parse(checkTick)}/>

        <input onChange={handleOnContentChange} autoComplete='off' value={checkInpPlace.content} name='content' type="text" className='checkListInp' />

      </div>
    </div>
  )
}

export default CheckMarksBox