import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import HLSDownloader from 'hlsdownloader';
import cors from 'cors';
dotenv.config({ path: "../.env" });

const app = express();
const port = 4000;

// Allow express to parse JSON bodies
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.ip} Method: ${req.method} Path: ${req.path}\nQuery ${JSON.stringify(req.query)}\nBody: ${JSON.stringify(req.body)}\n`);
  next();
})

app.post("/api/token", async (req, res) => {

  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json();

  // Return the access_token to our client as { access_token: "..."}
  res.send({ access_token });
});

// app.post('/download', (req, res) => {
//   console.log(req.headers.dlink)
//   return res.end("OK")
// })

app.post('/download', (req, res) => {
  console.log(req.headers)
  const downloader = new HLSDownloader({
    playlistURL: req.headers.dlink, // change it
    destination: '../client/public/videos', // change it (optional: default '')
    concurrency: 10,
    overwrite: true,
    // (optional: default = null
    onData: function (data) {
      console.log(data); // {url: "<url-just-downloaded>", totalItems: "<total-items-to-download>", path: "<absolute-path-of-download-loation>"}
    },
    // (optional: default = null
    onError: function (error) {
      console.log(error); // { url: "<URLofItem>", name: "<nameOfError>", message: "human readable message of error" }
    },
  });
  downloader.startDownload().then(response => {
    console.log(response)
    return res.end(response)
  });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
