import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import "./TagSection.css";
export default function TagSection() {
  // retrieve list of tags from backend

  //pseudo tag data
  const tags = [
    "Weather",
    "Food",
    "Singapore",
    "Chinese New Year",
    "Quantum Mechanics & Engineering",
    "January",
    "Money",
    "USA",
    "January",
    "January",
    "January",
    "January",
    "January",
    "January",
    "January",
    "January",
    "January",
    "January",
    "January",
    "January",
  ];


  // frontend tag filtering states
  const [searchInput, setSearchInput] = useState("")
  const tagsRef = useRef(null)

  // frontend tag filtering function
  const filterSelection = (input) => {
    const tags = tagsRef.current.getElementsByClassName('tagItem')
    
    for(const tag of tags){
      let classes = tag.className
      classes = classes.replace('tagItem ', '')
      if(classes.indexOf(input) === -1){
        tag.classList.add('hide')
      }
      else {
        tag.classList.remove('hide')
      }
    }
  }

  // https://www.w3schools.com/howto/howto_js_filter_elements.asp

  return (
    <div className="tagContainer">
      <div className="tagHeader">
        <h2 style={{marginRight:"10px"}}>Tags</h2>
        <input placeholder="Search..." type={"text"} onChange={(e)=>{setSearchInput(e.target.value)}}></input>
        <Button onClick={()=>filterSelection(`${searchInput}`)} variant="outlined">Search</Button>
      </div>
      <div className="tagBox" ref={tagsRef}>
        {tags.map((tag) => {
          return (
            <p key={tag} className={`tagItem ${tag}`}>
              {tag}
            </p>
          );
        })}
      </div>
    </div>
  );
}
