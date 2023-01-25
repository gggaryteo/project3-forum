import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TagSection from "../Components/Home/TagSection";
import "../Components/Home/Home.css";
import CardPost from "../Components/Home/Card";
import { GlobalChat } from "../Components/GlobalChat/GlobalChat";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Home = () => {
  const [trendingpostdata, setTrendingPostData] = useState({});
  const [userpostdata, setUserPostData] = useState([]);
  const [globalpostdata, setGlobalPostData] = useState([]);
  const { isAuth, headers, loggedUser } = useAuth();
  const [selectedStates, setSelectedStates] = useState([]);

  /// START ///
  // Helper functions for Tab CSS //
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={"div"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  /// END ///

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        const posts = await axios.get("http://localhost:3001/api/tag/getAll");

        let test = {};
        for (let obj of posts.data) {
          test[obj.name] = obj.taglist;
        }
        setTrendingPostData(test);
      } catch (err) {
        console.log(err);
      }
    };

    const getGlobalPosts = async () => {
      try {
        const posts = await axios.get("http://localhost:3001/api/post/getAll");
        // console.log(posts.data);
        setGlobalPostData(posts.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getUserPosts = async () => {
      try {
        const user_posts = await axios.get(
          `http://localhost:3001/api/post/${loggedUser.email}`
        );
        setUserPostData(user_posts.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTrendingPosts();
    getGlobalPosts();
    if (isAuth) {
      getUserPosts();
    }
  }, [isAuth, loggedUser.email]);

  const clearTagSelection = () => {
    setSelectedStates([]);
  };

  return (
    <div className="body">
      <div>
        <TagSection
          setSelectedStates={setSelectedStates}
          selectedStates={selectedStates}
          clearTagSelection={clearTagSelection}
        />

        <div>current selected tags: {`${selectedStates}`}</div>
      </div>

      <div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Global Feed" {...a11yProps(0)} />
              <Tab label="Trending " {...a11yProps(1)} />
              {isAuth ? <Tab label="Your Posts" {...a11yProps(2)} /> : null}
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {globalpostdata.map((post) => (
              <div key={post.id}>
                <Link
                  to={`/post/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardPost
                    post_id={post.id}
                    title={post.title}
                    date={post.createdAt}
                    description={post.content}
                    author={post.user_id}
                  />
                </Link>
              </div>
            ))}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {selectedStates.length != 0
              ? trendingpostdata[selectedStates[0]].map((post) => (
                  <div key={post.id}>
                    <Link
                      to={`/post/${post.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CardPost
                        post_id={post.id}
                        title={post.title}
                        date={post.createdAt}
                        description={post.content}
                        author={post.user_id}
                        tags={post.tags}
                      />
                    </Link>
                  </div>
                ))
              : null}
          </TabPanel>

          <TabPanel value={value} index={2}>
            {userpostdata.map((post) => (
              <div key={post.id}>
                <Link
                  to={`/post/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardPost
                    post_id={post.id}
                    title={post.title}
                    date={post.createdAt}
                    description={post.content}
                    author={post.user_id}
                  />
                </Link>
              </div>
            ))}
          </TabPanel>
        </Box>
      </div>

      <div>
        <GlobalChat />
      </div>
    </div>
  );
};

export default Home;
