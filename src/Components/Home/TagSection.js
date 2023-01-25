import { Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import "./TagSection.css";
import axios from "axios";

export default function TagSection(props) {
  // retrieve list of tags from backend
  const [tagData, setTagData] = useState({});
  const [tags, setSortedTag] = useState([]);

  useEffect(() => {
    const getTagData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/api/tag/getAll");

        const obj = {};

        result.data.map((data) => {
          const count = data.taglist.length;
          const tagname = data.name;
          obj[tagname] = count;
          return setTagData(obj);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getTagData();
  }, []);

  useEffect(() => {
    // data input = { "Food" : 2, " Health" : 1}
    // data output = ["Food", "Health"]
    const sortTagData = async (data) => {
      const keys = Object.keys(data);
      const sortedKeys = keys.sort((a, b) => data[b] - data[a]);
      setSortedTag(sortedKeys);
    };

    sortTagData(tagData);
  }, [tagData]);

  // frontend tag filtering states
  const [searchInput, setSearchInput] = useState("");
  const tagsRef = useRef(null);

  // frontend tag filtering function
  const filterSelection = (input) => {
    const tags = tagsRef.current.getElementsByClassName("tagItem");

    for (const tag of tags) {
      let classes = tag.className;
      classes = classes.replace("tagItem ", "");
      if (classes.indexOf(input) === -1) {
        tag.classList.add("hide");
      } else {
        tag.classList.remove("hide");
      }
    }
  };

  // https://www.w3schools.com/howto/howto_js_filter_elements.asp

  return (
    <div className="tagContainer">
      <div className="tagHeader">
        <h2 style={{ marginRight: "10px" }}>Tags</h2>
        <input
          placeholder="Search..."
          type={"text"}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        ></input>
        <Button
          onClick={() => filterSelection(`${searchInput}`)}
          variant="outlined"
        >
          Search
        </Button>
        <Button onClick={() => props.clearTagSelection()}>Clear</Button>
      </div>
      <div className="tagBox" ref={tagsRef}>
        {tags.map((tag) => {
          return (
            <div
              key={tag}
              className={`tagItem ${tag}`}
              onClick={(e) => props.setSelectedStates([e.target.textContent])}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}
