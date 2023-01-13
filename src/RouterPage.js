import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './routeComponents/General/Login.js'
import { Register } from './routeComponents/General/Register.js'
import { Main } from './routeComponents/Homepage/Main.js'
import { ViewPost } from './routeComponents/Homepage/ViewPost.js'
import { CreatePost } from './routeComponents/Homepage/CreatePost.js'
import { GlobalNavBar } from './routeComponents/Homepage/GlobalNavBar.js'
import { Profile } from './routeComponents/Profile/Profile.js'
import { EditProfile } from './routeComponents/Profile/EditProfile.js'


export const RouterPage = () => {


  return (
    <>
        <Routes>
            <Route path='Login' element={<Login/>} />
            <Route path='Register' element={<Register/>} />

            {/* logged in route */}
            <Route path='/LoggedIn' element={<GlobalNavBar/>}>
                <Route path='Main' element={<Main/>}>
                  <Route path="View" element={<ViewPost/>} />
                  <Route path='CreatePost' element={<CreatePost/>} />
                </Route>
                <Route path='Profile' element={<Profile/>}>
                  <Route path='Edit' element={<EditProfile/>} />
                </Route>
            </Route>

            {/* not logged in route (default route)*/}
            <Route path='/' element={<GlobalNavBar/>}>
                <Route path='Main' element={<Main/>}>
                  <Route path='View' element={<ViewPost/>}></Route>
                </Route>
            </Route>
        </Routes>
    </>
  )
}
