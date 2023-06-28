import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../constants';
import StoryDetails from './StoryParameters';
import CoverDetails from './CoverDetails';
import StoryParameters from './StoryParameters';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
 
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
 
const {setOption} = useAppContext()

  const handleSubmit =async (e)=>{
    
    e.preventDefault()
    console.log("submit")

    let imageArray = []
    await axios.post(`${BACKEND_URL}/story`,values).then((res)=>{  
        
      let jsonData = res.data.imagePrompts.replace(/(\r\n|\n|\r)/gm, "")  
      jsonData =  jsonData.replace(/\\/g, "");  
     jsonData = jsonData.replace(/\[|\]/g, "");
     jsonData= jsonData.replace(/["]+/g, '')
    imageArray = jsonData.split(",") 
      
     const storyId = res.data.story.id
      const data ={storyId,imageArray}
      
    console.log(data)
    return data

     
      })
      .then((data)=>{
         console.log(data.storyId)
         console.log(data.imageArray[0])
        for(let i=0; i<imageArray.length ; i++ ){
          axios.post(`${BACKEND_URL}/story/image`,{imageDesc:data.imageArray[i],storyId:data.storyId}).then((res)=>{
            console.log(res.data)
          })
        }
         
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
          {/* {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )} */}

          <Button onClick={handleNext} variant={"contained"}>
            {activeStep === steps.length - 1 ? 'Do the magic' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
    )}
  </Box>
  


  </>)
}

export default PersonalisedStoryForm 
