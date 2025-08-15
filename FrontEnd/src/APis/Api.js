import axios from 'axios';

//axios.defaults.withCredentials = true;

let base="http://localhost:5000/api";


const ID = localStorage.getItem('ID');



let Login    = (data)=> axios.post( `${base}/signin`,data ) ;
let Register = (data)=> axios.post( `${base}/signup`,data ) ;


let Applications = ()=> axios.get(`${base}/signin` , {
    
}) ;


let AddJob =  (data)=> axios.post( `${base}/post-job`,data , {
}) ;


let ApplyJob =  (data)=> axios.post( `${base}/apply`,data , {
    
}) ;

export default   {

    Login ,
    Register ,
    Applications ,
    AddJob  ,
    ApplyJob


}
