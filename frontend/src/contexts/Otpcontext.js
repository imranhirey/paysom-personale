import React,{useState,createContext} from 'react'
export const Otpcontext=createContext()
export const Otpprofider=(props)=>{

    let [otp,setotp]=useState({})
  

    return (
        <Otpcontext.Provider value={[otp,setotp]}>
            {props.children}
        </Otpcontext.Provider>
    )

}
