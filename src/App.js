import React from 'react'
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import CreatePage from './pages/CreatePage/CreateStory';
import StoryPage from './pages/storyPage/StoryPage';
 
import SideBar from './components/SharedLayout';
import SharedLayout from './components/SharedLayout';
import BrowsingPage from './pages/BrowsingPage/BrowsingPage';
 
 
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
         {/* <Route index element={<CreatePage />}></Route> */}
        {/* <Route index element={<Stats />}></Route> */}
        <Route path='/create' element={<CreatePage />}></Route>
        <Route path='/browse' element={<BrowsingPage/>}></Route>
     
      </Route>
      {/* <Route path='*' element={<Error />}></Route> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App