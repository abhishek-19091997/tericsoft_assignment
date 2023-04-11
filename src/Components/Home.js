import React from "react";
import "./home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
   const [formfeld, setformfield] = useState({
      height: "",
     weight: "",
   });
  const [bmi, setBmi] = useState();
  const navigate = useNavigate()
   const { height, weight } = formfeld;
   

   const handleChange = (event) => {
     const { name, value } = event.target;
     setformfield({ ...formfeld, [name]: value });
   };
   const BMICalculate = async (event) => {
     event.preventDefault();
     const token = JSON.parse(localStorage.getItem("token"));
     const url = await fetch("https://bmi-qc8w.onrender.com/calculateBMI", {
       method: "POST",
       body: JSON.stringify({
         height,
         weight,
       }),
       headers: {
         "Content-type": "application/json",
         authorization: `Bearer ${token}`,
       },
     });
     const res = await url.json();
     console.log(res);
     setBmi(res.BMI);

    
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div id="body">
      <div id="navbar">
        <button id="logout_btn" onClick={logoutUser}>Logout</button>
      </div>
      <div className="panel">
        <h2 class="text-center">Check your BMI</h2>
        <p id="introText" class="text-center">
          Enter your weight and height below to check your BMI results
        </p>
        <form>
          <div id="weightInput">
            <p>Put your weight in here (KG)</p>
            <input
              id="weight"
              type="number"
              pattern="[0-9]*"
              name="weight"
              value={weight}
              onChange={handleChange}
            />
          </div>
          <div id="heightInput">
            <p>And your height in here (CM)</p>
            <input
              id="height"
              type="number"
              pattern="[0-9]*"
              name="height"
              value={height}
              onChange={handleChange}
            />
          </div>
          <button type="button" class="btn" onClick={BMICalculate}>
            Calculate BMI
          </button>
          <div id="results" class="text-center">
            Your BMI results will appear here
            <h2>{ bmi}</h2>
          </div>
        </form>
      </div>
    </div>
  );
}
