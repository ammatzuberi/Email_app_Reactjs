import React, { useContext, useEffect, useState } from 'react'

import{auth} from "../firebase"

const AuthContext=React.createContext()

export function useAuth(){
    return  useContext(AuthContext)
}

export  function AuthProvider({children}) {
    const [currentUser, setcurrentUser]=useState()
    const [loading, setLoading] = useState(true)

function signup(email,  password){
    return  auth.createUserWithEmailAndPassword(email,password)
}
function login(email, password){
  return auth.signInWithEmailAndPassword(email,password)
}
function logout(){
  return auth.signOut()
}

useEffect(()=>{

  const unsubcribe =   auth.onAuthStateChanged(user=>{
            setcurrentUser(user)
            setLoading(false)
        }) 
        return unsubcribe
},[])

const value={
    currentUser,
    signup,
    login,
    logout
}
    
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
