
'use client'

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "../auth-client";


export default function userLogin  () {
     const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();
    const Login=async({formData,redirectTo,setFormData,setErrors})=>{
        setIsLoading(true)
        try{
const {data ,error:authError}=await authClient.signIn.email({
    ...formData
})
if(authError){
    setErrors(authError.message || "Invalid email or password."); 
}else{
  toast.success('Signed in successfully! Redirecting...')  
  setFormData({ email: '', password: '' });
  setErrors('')
    router.push(redirectTo)
}
    }catch(err){
 setErrors("An unexpected network error occurred.");
 toast.error("Login Failed")
    }finally{
 setIsLoading(false);
    }
    }
    return {Login,isLoading};
};

