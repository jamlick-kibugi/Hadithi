import React from 'react'
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import CreatePage from './pages/CreatePage/CreateStory';
import StoryPage from './pages/storyPage/StoryPage';
 
import SideBar from './components/SharedLayout';
import SharedLayout from './components/SharedLayout';
import BrowsingPage from './pages/BrowsingPage/BrowsingPage';
import LandingPage from './pages/LandingPage/LandingPage';
import IllustrationPage from './pages/IllustrationPage/IllustrationPage';
import IllustrationGallery from './pages/IllustrationPage/IllustrationGallery';
import CollabGallery from './pages/CollabPage/CollabGallery';
 
 
const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path='/register' element={<Register />}></Route> */}
      <Route path='/' element={<LandingPage />} />
      <Route
        path='/dashboard'
        element={
          // <ProtectedRoute>
            <SharedLayout />
          // </ProtectedRoute>
        }
      >
         {/* <Route index element={<LandingPage />}></Route> */}
        {/* <Route index element={<Stats />}></Route> */}
        <Route path='/dashboard/create' element={<CreatePage />}></Route>
        <Route path='/dashboard/browse' element={<BrowsingPage/>}></Route>
        <Route path='/dashboard/story' element={<StoryPage/>}></Route>
        <Route path='/dashboard/illustrations' element={<IllustrationPage />}></Route>
        <Route path='/dashboard/library/illustrations' element={<IllustrationGallery/>}></Route>
        <Route path='/dashboard/library/userCollabs' element={<CollabGallery/>}></Route>
      </Route>
      {/* <Route path='*' element={<Error />}></Route> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App