import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  const [formData, setFormData] = React.useState({
    textfield1: "",
  });
  const [showOutput, setShowOutput] = React.useState(false);
  const [salaryPredicted, setSalaryPredicted] = React.useState(0);

  async function handleSubmit(){
    console.log(formData)
    let res = await fetch("http://localhost:5000/predict", {
          method: "POST",
          // mode: "no-cors",
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          // body: JSON.stringify({name: "Ajitesh", sap: "123"}),
        });
          let resJson = await res.json();
          let salaryObj = JSON.parse(resJson.salary);
          let predictedSalary = salaryObj.salary;
          setShowOutput(true)
          setSalaryPredicted(predictedSalary)
  }
  return (
    <div className="App">
      <div className="title">
        SALARY PREDICTOR
      </div>
      <br/>
      <div>
        <input
          placeholder="ENTER YOUR WORKING EXPERIENCE(IN YEARS)"
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, textfield1: e.target.value };
            });
          }}
        />
      </div>
      <br />
      
      <div className="submit-btn" onClick={handleSubmit}
      >
        SUBMIT
      </div>
      <br/>
      {showOutput&&<div>
        Salary Predicted: {salaryPredicted}
      </div>}
    </div>
  );
}

export default App;
