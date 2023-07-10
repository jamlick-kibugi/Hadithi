import React, { useEffect, useRef, useState } from 'react'
 
import { Box, Button, TextField, Typography } from '@mui/material'
 
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import { useForm, SubmitHandler } from "react-hook-form"
import CreateOptions from '../../components/CreateOptions'
import PersonalisedStoryForm from '../../components/PersonalisedStoryForm'
import CreateStory from '../../components/CreateStory'
import { useAppContext } from '../../context/appContext'
import CircularProgress from '@mui/material/CircularProgress';
import { useOnDraw } from '../../components/Hooks'
import Canvas from '../../components/DrawingCanvas'
import html2canvas from 'html2canvas'
import { storage } from '../../firebase';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import BrushIcon from '@mui/icons-material/Brush';
import Crop169Icon from '@mui/icons-material/Crop169';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import createIllustration from '../../utils/createIllustration';
 
const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };
const CreatePage = () => {
  const {option,currentUserId} = useAppContext()
//   const {
//     setCanvasRef,
//     onCanvasMouseDown,
//     clearCanvas  ,   
//     canvasRef    
// } = useOnDraw();
 
const reactCanvasRef = useRef(null)

const divRef = useRef(null); 
function getCurrentDateTime() {
    var currentDateTime = new Date().getTime()
    return currentDateTime;
  }
useEffect(() => {
  // const ctx = canvasRef.current.getContext('2d');
  // const image = new Image();
  
  
  
  // ctx.globalAlpha = 1;
   

}, []);

const [prompt,setPrompt]=useState("")
const [image,setImage]=useState("")
const [color,setColor] = useState("black")
const [loading,setLoading] = useState(false)
// function onDraw(ctx, point, prevPoint) {
//     drawLine(prevPoint, point, ctx, '#000000', 5);
// }

// function drawLine(
//     start,
//     end,
//     ctx,
//     color,
//     width
// ) {

//     start = start ?? end;
//     ctx.beginPath();
//     ctx.lineWidth = width;
//     ctx.strokeStyle = color;
//     ctx.moveTo(start.x, start.y);
//     ctx.lineTo(end.x, end.y);
//     ctx.stroke();

//     ctx.fillStyle = color;
//     ctx.beginPath();
//     ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
//     ctx.fill();
    

// }


//hook form
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)
const downloadImage = () => {

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
          u8arr[n - 1] = bstr.charCodeAt(n - 1)
          n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
      }
  
      // -- Select canvas element
  
  
      // -- Use html2canvas to convert to base 64 image
      html2canvas(divRef.current,{useCORS: true,
        allowTaint: true,backgroundColor:null}).then((canvas) => {
        const base64image = canvas.toDataURL('image/png')
        console.log(base64image)
         

        const uploadToCloud = async () => {
           

            const file = dataURLtoFile(base64image)
            const formData = new FormData()
            formData.append('image', file, `testy`.concat(getCurrentDateTime()).concat(Math.random()))  
            console.log(formData)
            const storageRef = sRef(storage, `testy`.concat(getCurrentDateTime()).concat(Math.random()));  
        
                 uploadBytes(storageRef, file)
                 .then((snapshot) => {
                   console.log("submitted")
                   return getDownloadURL(snapshot.ref);
                
                    
                   
                   
            }).then((url)=>{
                console.log(url)
            })
           
         
        }
        uploadToCloud()
        

      })

   
    
  };
 
  return (<>

    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", justifyContent:"center",display:"flex",background:"#f8fafc"}}>
    

    <form onSubmit={handleSubmit( async(formData)=>{
        setLoading(true)
        const image =await  reactCanvasRef.current.exportImage("jpeg")
        console.log("hello")
        axios.post(`${BACKEND_URL}/story/illustration`,{prompt:prompt, image:image}).then((res)=>{
        console.log(res.data.output[1])
        setImage(res.data.output[1])
        setLoading(false)
        }
        
        )
        
    })}>
      <Box sx={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:2 , width:"256px" }}>
       <Button  variant="contained" onClick={()=>{
        const eraseMode = reactCanvasRef.current?.eraseMode
        eraseMode(false)}}><BrushIcon/></Button>
       <Button variant="contained" onClick={()=>{
        const eraseMode = reactCanvasRef.current?.eraseMode
        eraseMode(true)}}><Crop169Icon/></Button>
       <Button variant="contained" onClick={()=>{
        const clearCanvas = reactCanvasRef.current?.clearCanvas
        clearCanvas()}}><ClearAllIcon/></Button>
        </Box>

      <ReactSketchCanvas
            ref={reactCanvasRef}
            style={{width:256, height:256}}
            width="600"
            height="400"
            strokeWidth={4}
            strokeColor={color}
             
            
            
            
      />

    <Box sx={{height:"30px",mt:"10px",display:"flex",alignItens:"center"}} >
   <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} style={{height:"100%",marginRight:"10px" }}></input>
    <Button sx={{height:"100%"}} variant="contained" type="submit"  onClick={()=>{
      setLoading(true)}}>Generate</Button>
    </Box>
      {/* <input {...register("prompt", { required: true })} />
        {errors.prompt && <span> required </span>}
         
     
       
      {errors.exampleRequired && <span>This field is required</span>} */}

 
   
    </form>
    <Box sx={{display:"grid"}}>
     
    <Box sx={{height:"256px",width:"256px", background:"white",display:"flex",alignItems:"center",justifyContent:"center",border:2}}>
      {loading?<CircularProgress/>:null}
       {image && !loading ?<img src={image} style={{height:"256px",width:"256px"}}></img> :  null}
      
    </Box>
    <Box sx={{display:"flex",justifyContent:"flex-end"}}>
      <Button sx={{marginTop:"5px"}} onClick={()=>{createIllustration(image,currentUserId)}} variant="contained">Save</Button>
      </Box>

      </Box>
     </Box>
    
    </>

    
    
  )
}

export default CreatePage
