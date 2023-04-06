# github-backup
Schedule cron jobs to backup your repositories.

![screenshot](https://user-images.githubusercontent.com/12623921/230470196-450f9a28-3ebd-47c5-9b6b-b032477db367.png)

# Setup
1. Run the following commands.
```
$ git clone git@github.com:akashaviator/github-backup.git
$ cd github-backup
$ touch .env
```

2. Create a personal access token at https://github.com/settings/tokens/new?scopes=repo.



3. Add the token to the `.env` file.
```
//.env
GITHUB_ACCESS_TOKEN={YOUR-ACCESS-TOKEN}
```


4.
```
$ docker-compose up
```


5. Access the app at `http://localhost:3000`.

6. Enter the github repository to backup in the `Repository URL` field. Select the frequency of the backup.
----

Backups are downloaded to the `backups` folder at the root of the project.
