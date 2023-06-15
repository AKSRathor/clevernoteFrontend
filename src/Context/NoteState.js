import React, { useEffect, useRef } from 'react'
import NoteContext from './NoteContext'
import { useState } from 'react'

const NoteState = (props) => {

    const [currentNote, setCurrentNote] = useState({_id:-1, topic:"", description:"", date:"", tag:"general"})
    const [newNoteBool, setNewNoteBool] = useState(false)
    const host = "http://localhost:5000"
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NGE1MGNlN2IyOTExNzNlZjU4YTI1In0sImlhdCI6MTY4NjQxNDYwNH0.M0S-kT-WNsWlwL1qmgEZk0rR4e-FzN70Tp9JfcH3ebQ"
    const [quickNoteText, setQuickNoteText] = useState({description:"", _id:""})
    const [content, setContent] = useState(currentNote.description);
    const [tagListState, setTagListState] = useState([1,2])
    const tagListClick = useRef()
    const [currentTagList, setCurrentTagList] = useState("")
    const homePagePickup = useRef()
    const notebookPagePickup = useRef()
  

    const [checkList, setCheckList] = useState([
      {
        uid:0,
        tick: false,
        content: "Updated content 1",
        sno: 1
      },
      {
        uid:1,
        tick: false,
        content: "Updated content 2",
        sno: 2
      },
      {
        uid:2,
        tick: false,
        content: "Updated content 3",
        sno: 3
      },
      {
        uid:3,
        tick: false,
        content: "Updated content 4",
        sno: 4
      }


    ])

    


    const [mySchedules, setMySchedules] = useState([
        {
            sno: 0,
            _id: 1,
            from: "",
            to: "",
            task: "",
        },

    ])
    const [lastScheduleValue, setLastScheduleValue] = useState(mySchedules.length === 1 ? 1 : mySchedules[mySchedules.length - 2].sno)
    const [lastCheckListValue, setLastCheckListValue] = useState(checkList.length === 1 ? 1 : checkList[checkList.length - 2].sno)



    //Backend functions

    const editNote = async (id, cnt) => {
    
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": authToken,
            // localStorage.getItem('token'),

    
    
          },
          body: JSON.stringify({ topic:cnt.topic, description:cnt.description, tag:"general" })
        });
        console.log("the edit ", id, " ",cnt)
    
        const json = await response.json();
        console.log(json)
        // getNotes()
      }

      const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token":authToken
          }
        })
        const json = await response.json()
        console.log("notes fetched", json)
        // console.log(json)
        // return json
        setNoteList(json)

        // setNotes(json)
      }
      const [noteList, setNoteList] = useState(["",""])

    useEffect(() => {
      console.log("useeffect fetching ",getNotes( ))
      console.log("THe qnote is ", fetchQNote())
      // for(let i = 0; i<checkList.length;++i){
      //   addCheckMark(checkList,i)

      // }

    
      return () => {
        
      }
    }, [])
    


  const addNote = async () => {
    console.log("Adding a new note")
    //todo:api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken,


      },
      body: JSON.stringify({ topic:"", description:"", tag:"" })
    });
    const json = await response.json()
    setCurrentNote(json)
  }


  const fetchQNote = async () => {
    const response = await fetch(`${host}/api/qnote/fetchquicknote`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":authToken
      }
    })
    const json = await response.json()
    console.log("quicknotefetched", json[0])

    setQuickNoteText(json[0])
    return json[0]
  }

  const editQNote = async (id, cnt) => {
    
    const response = await fetch(`${host}/api/qnote/updatequicknote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken,
        // localStorage.getItem('token'),



      },
      body: JSON.stringify({description:cnt.description})
    });
    console.log("the edit ", id, " ",cnt)

    const json = await response.json();
    console.log(json)
    // getNotes()
  }

  


    return (


        <NoteContext.Provider value={{ mySchedules, setMySchedules, lastScheduleValue, setLastScheduleValue, checkList, setCheckList, lastCheckListValue, setLastCheckListValue, noteList, setNoteList, currentNote, setCurrentNote, newNoteBool, setNewNoteBool, editNote, addNote,quickNoteText, setQuickNoteText, editQNote,content, setContent, tagListState, setTagListState, tagListClick, currentTagList, setCurrentTagList, homePagePickup, notebookPagePickup }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState