 

import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import createPage from "./createPage";
 
    export default function createStory(url,title,currentUserId,imageArray,promptArray,paragraphs) {
        
      
      let coverUrl = ""

      function getCurrentDateTime() {
        var currentDateTime = new Date().getTime();
        return currentDateTime;
      }
        // Get file name from url.
         const filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0].concat(getCurrentDateTime()) ;
         console.log(filename)
         var xhr = new XMLHttpRequest();
         xhr.open('GET', url, true);
         xhr.responseType = 'blob';
         xhr.onload = function(e) {
           if (this.status == 200) {
             var myBlob = this.response;
             console.log(myBlob)
             const storageRef = sRef(storage, `images/${filename}`);  
    
             uploadBytes(storageRef, myBlob)
             .then((snapshot) => {
               console.log("submitted")
               return getDownloadURL(snapshot.ref);
               
               
             }).then(async(url)=>{
                console.log("we made it")                
                coverUrl = url
                const res= await axios.post(`${BACKEND_URL}/story/cover`,{coverUrl:coverUrl,title:title,userId:currentUserId})
                return res
            }).then(async(res)=>{
                const storyId = res.data.id

                // create a page for each image

                for(let i=0;i<paragraphs.length;i++){
                let pageNumber = i 
                createPage(imageArray[i],promptArray[i],paragraphs[i],storyId,pageNumber)             

                }

                
                
            }).then(()=>{
            
            })
             // myBlob is now the blob that the object URL pointed to.
           }
         };
         xhr.send();

       
         return coverUrl

         
    }