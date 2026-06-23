'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Form, TextField, Label, Input, Button } from 'react-aria-components';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
const router=useRouter()
const searchParams=useSearchParams()
const redirectTo=searchParams.get('redirect') || "/"
 
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setErrors("")
    try{
const {data ,error:authError}=await authClient.signIn.email({
    ...formData
})
if(authError){
    setErrors(authError.message || "Invalid email or password."); 
}else{
  toast.success('Signed in successfully! Redirecting...')  
  setFormData({ email: '', password: '' });
    router.push(redirectTo)
}
    }catch(err){
 setErrors("An unexpected network error occurred.");
 toast.error("Login Failed")
    }finally{
 setIsLoading(false);
    }
  
  };

  const textInputClass = "w-full h-11 px-4 py-2 border border-zinc-200 rounded-xl bg-zinc-50 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all";

  return (

    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      
     
      <div className="w-full max-w-md rounded-2xl border border-zinc-100 bg-white p-8 shadow-xl relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-zinc-500 mt-1.5">Sign in to your blood donor account</p>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-5">
          <TextField name="email" className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Email</Label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-zinc-400" />
              <Input 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`${textInputClass} pl-10`} 
              />
            </div>
          </TextField>

          <TextField name="password" className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Password</Label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-zinc-400" />
              <Input 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={handleChange} 
                className={`${textInputClass} pl-10 pr-10`} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </TextField>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl h-12 transition-all shadow-md shadow-red-500/20">
            Sign In
          </Button>
  {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-black dark:text-zinc-400">
                        New to Blood Donation?{" "}
                        <Link href={`/registration`} className="font-medium cursor-pointer text-sm text-red-600 ">
                            Create an account
                        </Link>
                    </div>

        </Form>
      </div>
    </div>
  );
};

export default LoginForm;