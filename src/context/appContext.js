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

  const [trigger,setTrigger] =useState([])
    
    // Personalised stories or collaborative stories
    const [option,setOption] = useState("")
    //Story Creation Inputs
    const [openModal,setOpenModal]=useState(false)

    //Canvas
    const canvasRef = useRef(null);
  function setCanvasRef(ref) {
    canvasRef.current = ref;
}

    //Authentication info
    const [currentUserId, setCurrentUserId] = useState("");
    const [userName,setUserName] = useState("")
    const[accessToken,setAccessToken]= useState("")


    //User info
    const [selectedUserId,setSelectedUserId] =useState("")
    //Story info
    const [currentStoryId, setCurrentStoryId] = useState("");
     const [isLoading,setIsLoading]=useState(false)

     //Collab Info
     const [currentCollabId,setCurrentCollabId]=useState("")
     const [isEditing,setIsEditing] =useState(false)

    let initialValues = {

      //storybook data
        content:"",
        character:"",
        location:"",
        genreId:1,
        ageId: 1,
        style:"",
        length:800,
        numOfPages:5,
      }
    
      const [values,setValues]= useState(initialValues)
      const [isDrawing,setIsDrawing] = useState(true)
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
       userName,
       setUserName,

       //Current Storybook Info
       currentStoryId,
       setCurrentStoryId,
       isLoading,
       setIsLoading,
       //current collab info
       currentCollabId,
       setCurrentCollabId,
       isEditing,
       setIsEditing,
       //user Info
       selectedUserId,
       setSelectedUserId,

       //modal info
       openModal,
       setOpenModal,
 

        //Creation Info
        option,
        setOption,
        values,
        setValues,
        handleChange,
        //Drawing
        setIsDrawing,
        isDrawing,
        canvasRef,
        setCanvasRef,
        trigger,
        setTrigger

        

        
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