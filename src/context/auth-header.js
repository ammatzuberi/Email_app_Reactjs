import React from 'react'

export default function authheader() {
    const user= JSON.parse(localStorage.getItem("user"));
    if(user&&user.accessToken){
        return{"x-auth-token":user.accessToken};

    }else{
        return{};
    }


}
