 

import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import { BACKEND_URL } from "../constants";
 
    export default function createPage(url,prompt,paragraph,storyId,pageNumber) {
        let pageUrl = ""

        
        function getCurrentDateTime() {
          var currentDateTime = new Date().getTime()
          return currentDateTime;
        }
        
        const formatData =  (data) => {   

          // removes line breaks,square brackets,backslashes  from chatgpt output
             const cleanData = data.replace(/(\r\n|\n|\r)/gm, "")
             .replace(/\\/g, "")
             .replace(/\[|\]/g, "")
             .replace(/["]+/g, '')
          
             return cleanData
          }
          
        
        // Get file name from url.
         const filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0].concat(getCurrentDateTime()).concat(Math.random()) ;
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
                console.log("pageUrl is working")    
                console.log(prompt)            
                pageUrl = url
                console.log(pageUrl)

                const page= await axios.post(`${BACKEND_URL}/story/page`,{pageNumber:pageNumber,
                          pageUrl:pageUrl,
                          pageContent:paragraph,
                          storyId:storyId ,
                          prompt:prompt})
                
                console.log(page) 
                
          
                
             })

             
             // myBlob is now the blob that the object URL pointed to.
           }
         };
         xhr.send();

         return pageUrl


    }