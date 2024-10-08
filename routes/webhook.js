import axios from "axios";
import express from "express";
const router=express.Router();

const createWebhook=async (repoOwner, repoName, accessToken)=>{
    const repoOwner='Java-Developer24';
    const repoName='test';
    const response = await axios.post(
        `https://api.github.com/repos/${repoOwner}/${repoName}/hooks`,{
            name: 'web',
            active: true,
            events: ['pull_request'],
            config: {
              url: `${process.env.APP_URL}/webhook`, 
              content_type: 'json',
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


}

router.post('/', async (req, res) => {
    const eventType = req.headers['x-github-event']; // Get the event type
  const payload = req.body; // Get the webhook payload
  if (eventType==="pull_request",req.body.action==="opened") {
    const prNumber = payload.number; 
    const action = payload.action;
    const title = payload.pull_request.title; 
    const user = payload.pull_request.user.login;
    console.log(`Pull request #${prNumber} was ${action} by ${user}: ${title}`);
    
  }
  res.sendStatus(200).send('Webhook received');;
})


export default createWebhook