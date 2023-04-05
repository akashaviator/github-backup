const express = require("express");
const fs = require("fs");
const { CronJob } = require("cron");
const { Octokit } = require("@octokit/core");
require("dotenv").config();

const app = express();

app.use(express.json());

app.post("/api/backups", (req, res) => {
  const { repositoryUrl, frequency } = req.body;
  console.log(req.body);

  if (!repositoryUrl || !frequency) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const job = new CronJob(`*/${frequency} * * * *`, async () => {
    try {
      const octokit = new Octokit();
      const url = new URL(repositoryUrl);
      const repo = url.pathname.split("/");
      console.log(repo);
      const data = await octokit.request(
        `GET /repos/{owner}/{repo}/zipball/{ref}`,
        {
          owner: repo[1],
          repo: repo[2],
          ref: "main",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const output = fs.createWriteStream(`${repo[2]}.zip`);
      const buffer = Buffer.from(data.data);
      output.write(buffer);
      output.end();
    } catch (error) {
      console.error(error);
    }
  });

  job.start();

  res.json({
    message: `Backup job for ${repositoryUrl} scheduled every ${frequency} minutes`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
