import React from 'react'
import "./Style/DropDown.css"

const DropDown = () => {
    const dropdownContent = ["Go to Notes", "Create New Note", "Remove Widget"] 
    const handleClick=(i)=>{
        console.log(i)
    }
  return (
    <div className='dropDown'>
        {dropdownContent.map((i)=>{
            return <button onClick= {()=>handleClick(i)} className='dropdownBtn' >{i}</button>
        })}
        
    </div>
  )
}

export default DropDown