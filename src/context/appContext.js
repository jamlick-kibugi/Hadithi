import { useState, useEffect, useReducer, useContext, useRef } from "react";
// import { database, storage } from "../firebase";
// import { onChildAdded, push, ref, set } from "firebase/database";
import React from "react";
import ReactDOM from "react-dom/client";
// Create context
const AppContext = React.createContext();

 
// const username = localStorage.getItem('username')

// Create Provider
const AppProvider = ({ children }) => {
    
    // Personalised stories or collaborative stories
    const [option,setOption] = useState("")
    //Story Creation Inputs

    //user id
    const [currentUserId, setCurrentUserId] = useState("");
    const[accessToken,setAccessToken]= useState("")

    let initialValues = {

      //storybook data
        content:"",
        character:"",
        location:"",
        genre:"",
        age: 1,
        style:"",
        length:"200",
        numOfPages:3,
      }
    
      const [values,setValues]= useState(initialValues)
      
      const handleChange=(e)=>{
       console.log(e.target.value)
       setValues({...values,[e.target.name]:e.target.value})
      }

  return (
    <AppContext.Provider
      value={{

         //Authentication Info
       currentUserId,
       setCurrentUserId,
       accessToken,
       setAccessToken,


        //storybook 
        option,
        setOption,
        values,
        setValues,
        handleChange

        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Exports

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };