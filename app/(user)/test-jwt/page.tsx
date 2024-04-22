'use client'
import { error } from 'console';
import React, { useState } from 'react';

export default function TestJWT() {
    const [accessToken, setAccessToken] = useState("");
    const [user,setUser] = useState(null)
    const [unAuthorized,setUnAuthorized] = useState(false)
    //handle login
    const handleLogin = async ()=>{
        const email = "chhunhychhunhy121828@gmail.com";
        const password = "chhunhy171103";
        fetch(process.env.NEXT_PUBLIC_API_URL + "/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            console.log("Data in jwt :",data)
            setAccessToken(data.accessToken)
            setUser(data.user)
        })
        .catch(error => {
            console.log(error);
        })
    }

    //handle patial update
    const handlePartialUpdate = async ()=>{
        const body = {
            name:"for women shoes update",
        };
      const res = await  fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${436}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        })
        if(res.status === 401){
            setUnAuthorized(true)
        }

        const data = await res.json()
        console.log("Update data :",data)
    }

    //hanlde refresh token
    const handleRefreshToken = async()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL + "/refresh",{
            method: "POST",
            credentials:"include",
            body: JSON.stringify({}),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log("Data refresh token :",data)
             setAccessToken(data.accessToken)
            
        }).catch((error)=>{
            console.log(error)
        });
    }
  return (
    <main className='grid h-screen place-content-center'>
      <h1 className='text-5xl text-pink-700'>Test Handle JWT</h1>
      <button onClick={handleLogin} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Login</button>
      <button onClick={handlePartialUpdate} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Update Patial</button>
      {unAuthorized && <button onClick={handleRefreshToken} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Refresh Token</button>}
    </main>
  );
}
