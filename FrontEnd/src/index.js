import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Addjob from './components/addJob'
import Applyjob from './components/applyjob';
import Applications from './components/Applications';
import LatestJobs from './components/LatestJobs';
import Signup from './components/signup';
import Signin from './components/signin';
import Applicants from './components/Applicants';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
 
} from "react-router-dom";

const router = createBrowserRouter([
  {
      path:"/postedjobs" ,
      element:<App/>

  } ,
  {
    path:"/" ,
    element:<Home/>

} ,

{
  path:"/addjob" ,
  element:<Addjob/>

} ,

{

path:"/applyjob" ,
element:<Applyjob/>

} ,
{

  path:"/applications" ,
  element:<Applications/>
  
  } ,
  {

    path:"/applicants" ,
    element:<Applicants/>
    
    } ,
  {

  path:"/latestjobs" ,
  element:<LatestJobs/>
  
  } ,

{

path:"/signup" ,
element:<Signup/>

} ,

{

path:"/signin" ,
element:<Signin/>

} ,
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


