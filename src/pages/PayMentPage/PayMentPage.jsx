import { async } from "@firebase/util";
import { Button } from "antd";

import React, { useEffect, useState } from "react";

import ReactDOM from 'react-dom/client';
import { json } from "react-router-dom";
import Fetch from "../../fetch";


const PayMentPage = (props) =>{

    
   // root.render(<RootComponent/>);
   

// async function fetchMyDocument() {      
//     try {
//       let response = await fetch('/path/to/file.html'); // Gets a promise
//       document.body.innerHTML = await response.text(); // Replaces body with response
//     } catch (err) {
//       console.log('Fetch error:' + err); // Error handling
//     }
//   }
// const [html, setHTML] = useState({__html: ""});
// const root = ReactDOM.createRoot(document.getElementsByClassName('API'));
// useEffect(()=>{
//   const fetchData= async() =>{
//       let response;
//       response = await fetch('https://pharma-track.onrender.com/api/v1/payment/create_payment_url',{ method:'POST', mode:'cors'} )
//       console.log(response)
//       console.log(response.url)
//       console.log(JSON.stringify(response))
//       const backendHtmlString = await response.text()
//       console.log(backendHtmlString)
//         return {__html: backendHtmlString};    
//     }
//     fetchData().then(r => {
//       if(r.redirected){
//          const redirectedToUrl = r.url
//          console.log(r.url)
//       }  
//     })
// }, [])

return (
<div className="App">
  <a href="https://pharma-track.onrender.com/api/v1/payment/create_payment_url1"> thanh toán</a>
  <Button type="primary" href="https://pharma-track.onrender.com/api/v1/payment/create_payment_url1" shape="default"  size='large'  > Thanh toán </Button>
</div>
);
  }
export default PayMentPage;

