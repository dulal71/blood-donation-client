'use server'


  const IMGBB_API_KEY = process.env.IMAGE_UPLOAD_API;
export const uploadUserImage = async (file) => {


 const formData = new FormData();

  formData.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const json = await res.json();

  if (!json.success) {
    throw new Error("Image upload failed");
  }

  return json.data.url;
};