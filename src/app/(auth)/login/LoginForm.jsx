'use client';

import TextInput from '@/component/auth/TextInput';
import validateLogin from '@/component/auth/validateLogin';
import userLogin from '@/lib/authService/userLogin';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Form, Input, Button } from 'react-aria-components';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginForm = () => {
    const {Login,isLoading}=userLogin()
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

const searchParams=useSearchParams()
const redirectTo=searchParams.get('redirect') || "/"
 
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const NewErrors= validateLogin({
     formData
    })
    if (Object.keys(NewErrors).length > 0) {
      setErrors(errors);
      return;
    }
    try{
await Login({formData,redirectTo,setFormData,setErrors})
}catch(error){
 console.log(error);
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
          <TextInput label="Email" icon={FaEnvelope} error={errors.email}><Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className={`${textInputClass} pl-10`}  /></TextInput>
         <TextInput  label="Password" icon={FaLock}>
                          <Input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}  className={`${textInputClass} pl-10`}  />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-zinc-400">{showPassword? <FaEyeSlash/>: <FaEye/>}</button>
                       </TextInput>
         <Button type="submit" 
         isLoading={isLoading}
         isDisabled={isLoading}
         className="w-full cursor-pointer bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl h-12 transition-all shadow-md shadow-red-500/20">
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