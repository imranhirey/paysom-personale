import React,{useState,createContext} from 'react'
export const Snackcontext=createContext()
export const Snackprofider=(props)=>{

    let [message,setmessage]=useState('')
  

    return (
        <Snackcontext.Provider value={[message,setmessage]}>
            {props.children}
        </Snackcontext.Provider>
    )

}
