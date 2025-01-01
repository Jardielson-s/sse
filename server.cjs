const express = require('express')

const app = express()

app.get('/coin', (req, res, _next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
      })
      const interval = setInterval(() => {
        const coin = Math.floor(Math.random() * 100000);
        res.write(`data: ${JSON.stringify({ coin })}\n\n`);
      }, 5000);
    
      res.on("close", () => {
        clearInterval(interval);
        res.end();
      });
      res.flushHeaders()
})

app.listen(process.env.SERVER_PORT || 3001, () => {
    console.log(`Listening port: ${process.env.SERVER_PORT || 3001}`)
})