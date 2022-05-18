import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core';

const SelectButton = ({ children, selected, onClick }) => {

  const useStyles = makeStyles(() => ({
      selectButton: {
          border: "1px solid gold",
          borderRadius: 5,
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          fontFamily: "Montserrat",
          cursor: "pointer",
          backgroundColor: selected ? "gold" : "",
          color: selected ? "black" : "",
          fontWeight: selected ? 700 : 500,
          "& hover": {
            backgroundColor:"gold",
            color:"black"
          },
         width:"13%",
         textAlign:"center"
      }
  }))

  const classes = useStyles()

  return (
    <div onClick={onClick} className={classes.selectButton}>{children}</div>
  )
}

export default SelectButton