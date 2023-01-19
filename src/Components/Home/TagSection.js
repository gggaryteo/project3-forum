import React from "react";
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
  ];

  return (
    <div className="tagContainer">
      <h2 className="tagHeader">Tags</h2>
      <div className="tagBox">
        {tags.map((tag) => {
          return (
            <p key={tag} className="tagItem">
              {tag}
            </p>
          );
        })}
      </div>
    </div>
  );
}
