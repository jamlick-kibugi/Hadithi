import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../constants';
import StoryDetails from './StoryParameters';
import CoverDetails from './CoverDetails';
import StoryParameters from './StoryParameters';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { storage } from '../firebase';
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import createStory from '../utils/createStory';
import createPage from '../utils/createPage';
 
const PersonalisedStoryForm = () => {
  const{values,handleChange} = useAppContext()
  const navigate = useNavigate()
  const steps = ['Describe your story', 'Story parameters'];
  
  const [imageArray,setImageArray]=useState([])
// Stepper Functions

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };
// End of Stepper Function
 
const {setOption,currentUserId} = useAppContext()

  const handleSubmit =async (e)=>{
    
    e.preventDefault()
    console.log("submit")
    await axios.post(`${BACKEND_URL}/story`,values)
    .then((res)=>{       
      console.log(res.data)        
    //upload images to firebase and create story + pages 
    const story = createStory(
      res.data.coverUrl,
      res.data.title,
      currentUserId,
      res.data.imageArray,
      res.data.promptArray,
      res.data.paragraphs
      )      
     
    

    })
     
    
  
      
  }
  return (<>

    <Box sx={{ width: '100%' }}>
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepOptional(index)) {
          labelProps.optional = (
            <Typography variant="caption">Optional</Typography>
          );
        }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>


   {/* <StoryDetails/> */}
   {activeStep==0 ? <CoverDetails/>:null}
   {activeStep==1 ? <StoryParameters/>:null}
   {/* {activeStep==1 ? <CircularProgress>:null} */}



    {activeStep === steps.length ? (
      <React.Fragment>
        <Typography>Working our magic</Typography>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
        </Typography> */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={()=>{setOption("")}} variant={"contained"}>Back to Main</Button>
        </Box>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
             background="black"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1  }}
            variant={"contained"}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
           

          <Button onClick={(e)=>{
            if(activeStep < steps.length - 1){
              handleNext()
            }else 
            handleSubmit(e)} } variant={"contained"}>
            {activeStep === steps.length - 1 ? 'Do the magic' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
    )}
  </Box>
  


  </>)
}

export default PersonalisedStoryForm 
