import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/generateVideo", async (req, res) => {
  try {
    const response = await fetch("https://api.json2video.com/v1/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.JSON2VIDEO_KEY}`
      },
      body: JSON.stringify({
        timeline: {
          tracks: [
            {
              clips: [
                {
                  asset: {
                    type: "text",
                    text: req.body.text || "朕在崩潰！AI短劇結局",
                    style: { fontSize: 48, color: "white" }
                  },
                  start: 0,
                  length: 5
                }
              ]
            }
          ]
        },
        output: { format: "mp4", resolution: "720p" }
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("後端伺服器已啟動 http://localhost:3000"));

