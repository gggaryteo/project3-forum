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

export default function CardPost(props) {
  const [likeColor, setLikeColor] = useState("");
  const [favColor, setFavColor] = useState("");

  const date = props.date;
  const stringDate = date.toString();
  // console.log(props.author);

  useEffect(() => {});

  const handleFavorite = (e) => {
    if (favColor === "") {
      setFavColor(red[900]);
    } else {
      setFavColor("");
    }
  };

  const handleLike = (e) => {
    if (likeColor === "") {
      setLikeColor(yellow[900]);
    } else {
      setLikeColor("");
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
          <Avatar sx={{ bgcolor: red[500] }}>
            M {/* input image or username */}
          </Avatar>
        }
        title={props.title}
        subheader={stringDate}
      />
      {/* <CardMedia
        component="img"
        height="194"
        // image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent
        sx={{
          width: 600,
          height: 150,
          margin: auto,
          backgroundColor: "rgb(245, 245, 245)",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          sx={{
            left: "90%",
            color: `${likeColor}`,
          }}
          onClick={handleLike}
        >
          <ThumbUpIcon />
        </IconButton>

        <IconButton
          sx={{
            left: "75%",
            color: `${favColor}`,
          }}
          onClick={handleFavorite}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
