import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TagSection from "../Components/Home/TagSection";
import "../Components/Home/Home.css";
import CardPost from "../Components/Home/Card";
import { GlobalChat } from "../Components/GlobalChat/GlobalChat";

const Home = () => {
  const [postdata, getPostData] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await axios.get("http://localhost:3001/api/post/getAll");
        // console.log(posts.data);
        getPostData(posts.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="body">
      <div>
        <div>
          <h1 className="header">Global Feed</h1>
          <hr styles="width:650px" />
        </div>
        {postdata.map((post) => (
          <div>
            <CardPost
              title={post.title}
              date={post.createdAt}
              description={post.content}
              author={post.user_id}
            />
          </div>
        ))}
      </div>

      <div>
        <TagSection />
      </div>
      <div>
        <GlobalChat />
      </div>
    </div>
  );
};

export default Home;
