import React from "react";
import "./TagSection.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TagSection(props) {
  // retrieve list of tags from backend
  const [tagData, setTagData] = useState({});
  const [sortedTag, setSortedTag] = useState([]);

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

    // data input = { "Food" : 2, " Health" : 1}
    // data output = ["Food", "Health"]
    const sortTagData = async (data) => {
      const keys = Object.keys(data);
      const sortedKeys = keys.sort((a, b) => data[b] - data[a]);
      setSortedTag(sortedKeys);
    };

    getTagData();
    sortTagData(tagData);
  }, [tagData]);

  return (
    <div className="tagContainer">
      <h2 className="tagHeader">Tags</h2>
      <div className="tagBox">
        {sortedTag.map((tag) => {
          return (
            <div key={tag} className="tagItem">
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}
