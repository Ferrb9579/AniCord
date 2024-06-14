import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios';

// import { DiscordSDK } from "@discord/embedded-app-sdk";

// let auth;

// const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

// setupDiscordSdk().then(() => {
//   console.log("Discord SDK is authenticated");
//   axios.post("/download", null, {
//     headers: {
//       dlink: "https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
//     }
//   }).then(res => {
//     console.log(res)
//   })
//   // axios.post(`/download`, {
//   //   headers: {

//   //   }
//   // })
//   // .then(res => {
//   //   console.log(res)
//   // })
//   discordSdk.commands.openExternalLink({
//     url: 'https://files.vidstack.io/sprite-fight/poster.webp'
//   });

//   // We can now make API calls within the scopes we requested in setupDiscordSDK()
//   // Note: the access_token returned is a sensitive secret and should be treated as such
// });

// async function setupDiscordSdk() {
//   await discordSdk.ready();
//   console.log("Discord SDK is ready");

//   // Authorize with Discord Client
//   const { code } = await discordSdk.commands.authorize({
//     client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
//     response_type: "code",
//     state: "",
//     prompt: "none",
//     scope: [
//       "identify",
//       "guilds",
//     ],
//   });

//   // Retrieve an access_token from your activity's server
//   const response = await fetch("/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       code,
//     }),
//   });
//   const { access_token } = await response.json();

//   // Authenticate with Discord client (using the access_token)
//   auth = await discordSdk.commands.authenticate({
//     access_token,
//   });

//   if (auth == null) {
//     throw new Error("Authenticate command failed");
//   }
// }









console.log("Hello world")
axios.post("http://127.0.0.1:4000/download", null, {
  headers: {
    dlink: "https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
  }
}).then(res => {
  console.log(res)
}).catch(function(error) {
  console.log(error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
