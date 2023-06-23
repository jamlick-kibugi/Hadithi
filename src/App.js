import React from 'react'
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CollabStory from './components/CollabStory';   
import CreatePage from './pages/createPage/CreatePage';
import StoryPage from './pages/storyPage/StoryPage';
 
const App = () => {

  return (
  <BrowserRouter>
   {/* <NavBar></NavBar> */}
   <Routes>
      <Route path="/" element={<CreatePage/>}/>
      <Route path="/story" element={<StoryPage/>}/>
       
       
  </Routes>  
  </BrowserRouter>
  )
}

export default App