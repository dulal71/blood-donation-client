import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('blood-donation');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  user:{
    additionalFields:{
    role:{type: "string", default:"donor"},
     phone:{ type: "string", required: false } ,
    bloodGroup: { type: "string", required: false },
   district: { type: "string", required: false },
 upazila: { type: "string", required: false },
}
  }
});