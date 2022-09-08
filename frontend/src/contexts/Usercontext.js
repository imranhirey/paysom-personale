import React,{useState,createContext, useEffect} from 'react'
import Resourses from '../features/resouces'
export const Usercontext=createContext()
export const Userprofider=(props)=>{
   useEffect(()=>{
    let getuser=async()=>{
        let usertoken=localStorage.getItem('accesstoken')
        if (usertoken){
            console.log(usertoken)
            let resources=new Resourses()
            resources.token=usertoken
            let res=await resources.verifytoken()
            console.log('getting user',res.data)
            if(!res.data.data.email){
                setuser(null)
                console.log('stting the user as null')
                localStorage.removeItem('accesstoken')
                
            }
            else{
               let usertoken=localStorage.getItem('accesstoken')
               resources.token=usertoken
               resources.refreshtoken()
               let respond=await resources.retriveuserbytoken()
               console.log('respondhiga waa',respond)
               let user=respond.data.data.userka
               console.log('jee adag',user)
              setuser(user)
              console.log('dhinaa kalaa loo soo gudbay')
              console.log('kadib userka waa',user)
            }
            
        }
        else{
            setuser(null)
        }
    }
    getuser()
   },[])
   
    let [user,setuser]=useState('null')
    console.log(user)

    return (
        <Usercontext.Provider value={[user,setuser]}>
            {props.children}
        </Usercontext.Provider>
    )

}
