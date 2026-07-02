
 const validateSignup=({ formData, logoUrl})=>{
const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.upazila) newErrors.upazila = "Upazila is required";
    if (!logoUrl) newErrors.logo = "Profile image is required";
    if (!formData.password.trim()) { newErrors.password = "Password is required";}
if (!formData.confirm_password.trim()) {
  newErrors.confirm_password = "Confirm password is required";
} else if (formData.password !== formData.confirm_password) {
  newErrors.confirm_password = "Passwords do not match!";
}
    return newErrors;
}
export default validateSignup;