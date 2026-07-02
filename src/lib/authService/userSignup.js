
'use client'

import { toast } from "sonner";
import { authClient } from "../auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function userSignup  () {
     const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();
    const signup=async({finalSubmittedData,redirectTo})=>{
        setIsLoading(true)
         try {
              const { data, error } = await authClient.signUp.email({ ...finalSubmittedData });
              if (error) {
                toast.error(error.message || "Registration failed!");
              } else {
                toast.success("Registration successful!");
                router.push(redirectTo);
              }
            } catch (error) {
              console.error(error);
            }
    }
    return {signup,isLoading};
};

