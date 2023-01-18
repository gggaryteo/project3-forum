import React from 'react'
import Paper from "@mui/material/Paper";

export const RightMessage = (props) => {
  return (
    <>
        <Paper elevation={2} sx={{
            marginBlock: 1,
            width:"70%",
            position:"relative",
            display:"flex",
            flexWrap:"wrap",
            left:"90px",
            padding:"2px"
        }}>
            {props.msg}
        </Paper>
    </>
    
  )
}
