import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhookHandler } from './webhooks/clerk.js';
import "dotenv/config";
import { getEnv } from './lib/env.js';

const env=getEnv();
const app = express();
const rawJson=express.raw({ type: 'application/json' ,limit:'1mb' });
app.post('/webhook/clerk', rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
} );
const PORT = env.PORT || 3001;

app.use(express.json());// for configuring the express to accept json data.If we don't use this then we will get undefined when we try to access the req.body. For example, if user is sending something like req.body then we can grab that.
app.use(cors());
app.use(clerkMiddleware());
  
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});