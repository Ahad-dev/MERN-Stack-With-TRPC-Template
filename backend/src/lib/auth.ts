// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "../config/connectDB";
import dotenv from "dotenv";
import { sendEmail } from "../utils/send-email";
dotenv.config();

export const createAuth = async () => {
  const db = await connectDB();
  return betterAuth({
    trustedOrigins: [process.env.CLIENT_URL],
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    database: mongodbAdapter(db),
    emailAndPassword: { 
      enabled: true,
      sendResetPassword:async({user,token,url},request)=>{
        await sendEmail({
          to: user.email,
          subject: "Reset your password",
          text: `Click the link to reset your password: ${url}`,
          html: `<p>Click the link to reset your password: <a href="${url}">${url}</a></p>`,
        });
      }
    },
    emailVerification:{
      sendOnSignUp:true,
      sendVerificationEmail:async({token,url,user}, request)=> {
        await sendEmail({
          to: user.email,
          subject: "Verify your email",
          text: `Click the link to verify your email: ${url}`,
          html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
        })
      },
    }
    
  });
};
