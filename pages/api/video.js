import ytdl from 'ytdl-core';
import fs from 'fs';

const downloadVideo = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { url } = req.body;

      // Check if the URL is a valid YouTube video URL
      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube video URL' });
      }

      const videoInfo = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });

      // Set the response headers
      res.setHeader('Content-Disposition', `attachment; filename="${videoInfo.title}.mp4"`);
      res.setHeader('Content-Type', 'video/mp4');

      // Pipe the video stream to the response
      ytdl(url, { format: format })
        .pipe(res);

    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  } else {
    console.log('Method Not Allowedasdf');
    res.status(405).end(); // Method Not Allowed
  }
};

export default downloadVideo;
