import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from "../helpers/axiosWithAuth"

import {getToken} from "../helpers/axiosWithAuth"

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=> {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(response => {
      console.log(response);
      setColorList(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  })
 console.log(getToken());
 console.log("localstorage", localStorage.getItem('token'))
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
