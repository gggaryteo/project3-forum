import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { red, yellow } from "@mui/material/colors";
import { auto } from "@popperjs/core";
import { useAuth } from "../../context/AuthContext";
import getUsername from "../../services/getUsername";
import axios from "axios";

export default function CardPost(props) {
  const [likeColor, setLikeColor] = useState("");
  const [favColor, setFavColor] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const { isAuth, headers, loggedUser } = useAuth();
  const [currentUser, setUserInfo] = useState({});
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [currentUserFav, setCurrentUserFav] = useState(false);

  const date = props.date;
  const stringDate = date.toString();

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const likeStatus = await axios.get(
          `http://localhost:3001/api/userpost/getLikeStatus/email=${loggedUser.email}&post_id=${props.post_id}`
        );
        setCurrentUserLike(likeStatus.data);
      } catch (err) {}
    };

    const checkFavStatus = async () => {
      try {
        const favStatus = await axios.get(
          `http://localhost:3001/api/userpost/getFavStatus/email=${loggedUser.email}&post_id=${props.post_id}`
        );
        setCurrentUserFav(favStatus.data);
      } catch (err) {}
    };

    // Check all post for initial like status the on the first render
    if (isAuth) {
      checkLikeStatus();
      checkFavStatus();
      if (currentUserLike) {
        setLikeColor(yellow[900]);
      } else {
        setLikeColor("");
      }

      if (currentUserFav) {
        setFavColor(red[900]);
      } else {
        setFavColor("");
      }
    }

    // To set default post profile avatar [username or img]
    getUsername(props.author).then((result) => {
      setAuthor(result.data.username);
      if (result.data.userimg === null) {
        setAuthorImg(" ");
      } else {
        setAuthorImg(result.data.userimg);
      }
    });
  }, [currentUserLike]);

  /// HANDLE BACKEND LIKE STATUS ///
  const addLikes = async () => {
    const data = {
      email: loggedUser.email,
      post_id: props.post_id,
    };

    try {
      const addLike = await axios.post(
        "http://localhost:3001/api/userpost/like/post",
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLikes = async () => {
    const data = {
      email: loggedUser.email,
      post_id: props.post_id,
    };

    try {
      const deleteLike = await axios.delete(
        `http://localhost:3001/api/userpost/like/email=${loggedUser.email}&post_id=${props.post_id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = (e) => {
    if (likeColor === "") {
      addLikes();
      setLikeColor(yellow[900]);
    } else {
      deleteLikes();
      setLikeColor("");
    }
  };
  /// HANDLE BACKEND LIKE STATUS ///

  /// HANDLE BACKEND FAV STATUS ///

  const addFav = async () => {
    const data = {
      email: loggedUser.email,
      post_id: props.post_id,
    };

    try {
      const addFav = await axios.post(
        "http://localhost:3001/api/userpost/fav/post",
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFav = async () => {
    const data = {
      email: loggedUser.email,
      post_id: props.post_id,
    };

    try {
      const deletefav = await axios.delete(
        `http://localhost:3001/api/userpost/fav/email=${loggedUser.email}&post_id=${props.post_id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = (e) => {
    if (favColor === "") {
      addFav();
      setFavColor(red[900]);
    } else {
      deleteFav();
      setFavColor("");
    }
  };

  return (
    <Card
      sx={{
        width: 650,
        height: 300,
        margin: 2,
        backgroundColor: "rgb(155,155,155)"
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} alt={author} src={authorImg} />
        }
        title={props.title}
        subheader={stringDate}
      />

      <CardContent
        sx={{
          width: 600,
          height: 150,
          margin: auto,
          backgroundColor: "rgb(245, 245, 245)",
        }}
      >
        <Typography component={"div"} variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          sx={{
            left: "90%",
            color: `${likeColor}`,
          }}
          onClick={isAuth ? handleLike : null}
        >
          <ThumbUpIcon />
        </IconButton>

        <IconButton
          sx={{
            left: "75%",
            color: `${favColor}`,
          }}
          onClick={isAuth ? handleFavorite : null}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
