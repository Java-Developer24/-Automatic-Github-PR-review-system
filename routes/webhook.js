import axios from "axios";
import express from "express";
const router=express.Router();

const createWebhook=async ( accessToken,githubId,githubUsername,res)=>{
    const repoOwner='Java-Developer24';
    
    try {
      const response = await axios.post(
          `https://api.github.com/repos/${repoOwner}/test/hooks`, {
              name: 'web',
              active: true,
              events: ['pull_request'],
              config: {
                  url: "https://automatic-github-pr-review-system.vercel.app/", 
                  content_type: 'json',
                  insecure_ssl: "0",
              },
          },
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Accept: 'application/vnd.github.v3+json',
              },
          }
      );

      console.log('Webhook created successfully:', response.data);
      res.status(200).json("Webhook created");
  } catch (error) {
      console.error('Error creating webhook:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).json({ message: "Failed to create webhook", error: error.message });
  }



}

router.post('/', async (req, res) => {
    const eventType = req.headers['x-github-event']; // Get the event type
  const payload = req.body; // Get the webhook payload
  if (eventType==="pull_request"&& req.body.action==="opened") {
    const prNumber = payload.number; 
    const action = payload.action;
    const title = payload.pull_request.title; 
    const user = payload.pull_request.user.login;
    console.log(`Pull request #${prNumber} was ${action} by ${user}: ${title}`);
    
  }
  res.sendStatus(200).json("webhook created");
})


export default createWebhook