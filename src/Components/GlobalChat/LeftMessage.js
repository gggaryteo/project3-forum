import React from 'react'
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar"

export const LeftMessage = (props) => {
  return (
    <>
        <div style={{display:"flex", flexDirection:"row"}}>
            <Avatar alt='img' src='https://i-ogp.pximg.net/c/540x540_70/img-master/img/2014/06/09/19/36/21/43993838_p0_square1200.jpg'>

            </Avatar>
            <Paper elevation={2} sx={{
                marginLeft:"10px",
                marginBlock:"10px",
                width:"70%",
                position:"relative",
                display:"flex",
                flexWrap:"wrap",
                padding:"2px"
            }}>
                {props.msg}
            </Paper>
        </div>
        
    </>
    
  )
}
