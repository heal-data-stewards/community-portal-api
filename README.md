# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## RENCI Deployment
### As of Nov 2023 All work is being done on the master branch until further notice. Anywhere that is says staging is to be replaced with master. 

1. Note: Check if there has been any new changes on the branch you will be deploying. If so pull in the latest changes for the branch you will be deploying (should always be staging)
2. Note: If new changes, merge them into your local working branch.
3. Build and test API locally. 
4. Once tested and approved push up your changes.
5. Create a PR and tag team members for review.
6. Once PR is approved, team members will tag you so that you can merge it and complete the deployment. (This step is nesseccary to make sure everyone working on the API can also access it and redeploy it)
7. SSH into server (If you do not have a private key file, reach out to your manager for assistance)
8. Make sure the newest changes were pushed from github, if not pull them in manually.
9. From ~ run: pm2 restart ecosystem.config.js
10. NOTE: To check status of restart run: pm2 logs
11. The API should now be rebuilt with the newest changes

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!


### `Installation`

## Setting up A Postgres Database (Quick and easy set up using Postgres App) https://postgresapp.com/downloads.html


1. Download package 
2. Choose initialize from within the app
3. Make note of your database information (port, name, username, and password)
```
(Commands that may be useful once you are in the psql cli)
* \list or \l: list all databases
* \c <db name>: connect to a certain database
* \dt: list all tables in the current database using your search_path
* \dt *.: list all tables in the current database regardless your search_path
```
## Installing the API 

1. Clone repo
2. npm install
3. Create a .env file and add the following
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your api key 
JWT_SECRET=your jws secret
TRANSFER_TOKEN_SALT=your api token salt
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false
(Make sure db host, port, name, username, and password match your settings previously created in your local psql db creation)
```
4. npm run develop
5. Visit on localhost:1337
6. Pull in the db From the production site info coming soon

## Restoring the database
1. In AWS RDS go to snapshots
2. Choose the date you want a snapshot of
3. Create the snapshot
4. In the setting for class choose db.t3.small
5. Wait until the new DB instance is created
6. Take note of the new endpoint which can be found in Connectivity & Security in RDS
7. SSH into the server
8. Open up ecosystem.config.js and change the value for DATABASE_HOST to the new endpoint.
9. Save
10. RUN pm2 restart ecosystem.config.js

### `Development/Workflow`
### As of Nov 2023 All work is being done on the master branch until further notice. Anywhere that is says staging is to be replaced with master. 

1. Make sure you pull down all the latest code (staging). (Crucial)
2. Note: (If the production data is needed) Transfer data from remote instance to your local instance 
* 1. In a new terminal window, navigate to the root directory of the destination instance.
* 2. npm run strapi transfer -- --from remoteURL
* 3. Add the transfer token when prompted to do so.
* 4. Answer Yes or No to the CLI prompt: "The transfer will delete all of the local Strapi assets and its database. Are you sure you want to proceed?".
3. Create a new branch for development (should be linked to a github issue)
4. Once task is completed and tested push up the branch and create a PR to staging and tag team mates for review.
5. For deployment see "RENCI Deployment" section.
