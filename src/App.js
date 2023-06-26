import React from 'react'
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CollabStory from './components/CollabStoryCard';   
import CreatePage from './pages/createPage/CreateStory';
import StoryPage from './pages/storyPage/StoryPage';
 
import SideBar from './components/SharedLayout';
import SharedLayout from './components/SharedLayout';
import CreateStory from './components/CreateStory';
 
const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path='/register' element={<Register />}></Route>
      <Route path='/landing' element={<Landing />} /> */}
      <Route
        path='/'
        element={
          // <ProtectedRoute>
            <SharedLayout />
          // </ProtectedRoute>
        }
      >
         <Route index element={<CreatePage />}></Route>
        {/* <Route index element={<Stats />}></Route> */}
        {/* <Route path='/story' element={<CreatePage />}></Route> */}
        {/* <Route path='add-job' element={<AddJob />}></Route>
        <Route path='profile' element={<Profile />}></Route> */}
      </Route>
      {/* <Route path='*' element={<Error />}></Route> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App