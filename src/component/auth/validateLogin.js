 
 const validateLogin=(formData)=>{
    
const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) { newErrors.password = "Password is required";}
    return newErrors;
}
export default validateLogin;