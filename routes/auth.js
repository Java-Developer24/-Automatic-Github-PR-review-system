import axios from "axios";

import express from "express";
import dotenv from "dotenv";

import Token from "../models/Token.model.js";
import createWebhook from "./webhook.js";

dotenv.config();


const router=express.Router();
router.get("/github/callback", async (req, res) => {
    const{code}=req.query;
    try {
      const response= await axios.post(" https://github.com/login/oauth/access_token",{
          client_id:process.env.GITHUB_CLIENT_ID,
          client_secret:process.env.GITHUB_CLIENT_SECRET,
          code,
         },{
         headers:{
           Accept: "application/json"
         }});
  
         const accessToken=response.data.access_token;
         console.log(accessToken);
         const userResponse= await axios.get("https://api.github.com/user",{
          headers:{Authorization:`Bearer ${accessToken}`}
  });
        const githubId = userResponse.data.id;
        console.log(githubId);
        const githubUsername = userResponse.data.name;
        console.log(githubUsername);

        let tokenRecord = await Token.findOne({ githubId });
        console.log(tokenRecord);

  
      if (tokenRecord) {
        tokenRecord.accessToken = accessToken;
        await tokenRecord.save();
      } else {
        tokenRecord = new Token({ githubId, accessToken,githubUsername });
        await tokenRecord.save();
      }
      createWebhook(githubId,githubUsername,accessToken);
        
  
  
        res.send(`GitHub OAuth successful! Token saved.`);
        
      
    } catch (error) {
      console.error("Error during GitHub OAuth:", error);
        res.status(500).send("Error during GitHub OAuth callback.");
    }


})
export default router;