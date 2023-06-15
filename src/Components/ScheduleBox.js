import React from 'react'
import { useState, useEffect, useref } from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/NoteContext'

const ScheduleBox = (props) => {
    
  const context = useContext(NoteContext)
  const{mySchedules, setMySchedules, lastScheduleValue, setLastScheduleValue} = context
  const handleOnScheduleChange = async(e)=>{
    if(e){

      props.setCurrentHeight1(mySchedules.length*65+200+"px")
      console.log("The current height is reacthed",props.currentHeight1*10)
      // console.log("inside the e")
      await setScheduleBoxPlace({...scheduleBoxPlace, [e.target.name]: e.target.value})
      let scheduleBoxPlaceTemp = {
        from: "",
        to: "",
        task: "",
        sno: props.sno,
        _id: props.sno+1
      }
      if(e.target.name === "task"){
        console.log("inside the task field")
        scheduleBoxPlaceTemp.task = e.target.value
      }
      else{
        console.log("Insdide the task else field")
        scheduleBoxPlaceTemp.task = mySchedules[props.sno].task
      }
      if(e.target.name === "from"){
        
        scheduleBoxPlaceTemp.from = e.target.value
      }
      else{
        scheduleBoxPlaceTemp.from = mySchedules[props.sno].from
      }

      if(e.target.name === "to"){
        
        scheduleBoxPlaceTemp.to = e.target.value
      }
      else{
        scheduleBoxPlaceTemp.to = mySchedules[props.sno].to

      }
      

      //updating values
      let mySchedulesTemp = await mySchedules;
      // mySchedulesTemp[props.sno] = await scheduleBoxPlace;
      mySchedulesTemp[props.sno] = await scheduleBoxPlaceTemp;
      await setMySchedules(mySchedulesTemp)
      // console.log("After the e")

    }
    if(props._id === mySchedules[mySchedules.length - 1 ]._id) {
      // console.log('inside the if')
      await setLastScheduleValue(lastScheduleValue+1);
      await setMySchedules([...mySchedules, { sno:lastScheduleValue, _id: lastScheduleValue+1, from: "", to: "", task: "" }])
      
    }
    console.log("The length of mySchedule is ", mySchedules.length, " my sch3edule is: ", mySchedules )

    if(mySchedules.length>=2 && mySchedules[mySchedules.length - 2 ].from === "" && mySchedules[mySchedules.length - 2 ].to ==="" && mySchedules[mySchedules.length - 2 ].task==="" ){
      console.log("Schedule length is ",mySchedules.length)
      console.log("at ", mySchedules.length-2, " from ", mySchedules[mySchedules.length - 2 ].from," to ", mySchedules[mySchedules.length - 2 ].to, " task ", mySchedules[mySchedules.length - 2 ].task)
      const mst = [...mySchedules];
      mst.pop();
      setMySchedules(mst)
      await setLastScheduleValue(lastScheduleValue-1);
      console.log(mySchedules)
    }
    if(props.sno<mySchedules.length-2 &&  mySchedules[props.sno].from === "" && mySchedules[props.sno].to ==="" && mySchedules[props.sno].task==="" ){
      console.log(props.sno, " is empty")
    }

}
  // const sBox = useRef()

  useEffect(() => {
     console.log(mySchedules)
    //  console.log("setting current height", props.currentHeight)
     
     return () => {
       
      //  props.setCurrentHeight("390px")
    }
  }, [handleOnScheduleChange])
  

    const [scheduleBoxPlace, setScheduleBoxPlace] = useState({_id:props._id, from:props.from, to:props.to, task:props.task})
    
    return (
        <div className='scheduleBox' >
            <div className="scheduleTimeDisplayLeft">
                <input autoComplete='off' onChange={handleOnScheduleChange}  type="text" value={scheduleBoxPlace.from} name='from' className='scheduleTimeFrom' />
                <input autoComplete='off' onChange={handleOnScheduleChange} type="text" value= {scheduleBoxPlace.to} name='to' className='scheduleTimeTo' />
            </div>
            <div className="scheduleTimeDisplayRight">
                <input autoComplete='off
                ' onChange={handleOnScheduleChange} value={scheduleBoxPlace.task} name='task' type="text" className='scheduleTask' />
            </div>
        </div>
    )
}

export default ScheduleBox