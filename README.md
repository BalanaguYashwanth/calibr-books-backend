# calibr-books-backend


| Prerequisite  | Version|
| ------------- | ------------- |
| Node  | Latest  |
| NPM  | Latest |
| Elastic Cloud  | Latest |
| MongoDB Community Server  | Latest |



## Getting Started To Run 🚀

```bash
npm i
load .env from sample.env
Configure other servers in .env
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## MongoDB setup

- Create an mongodb account
- Create organisation once you logged into mongodb dashboard
- Create Project under organisation 
- Select owner and setup password
- Create deployment select free tier for trail usage
- Navigate to Browse collection to check documents

## MongoDB Connection

- Under project, click on "connect" button
- Click on drivers and COPY the link
- Add that link inside .env and add password

## Elastic Cloud setup

- Create an elastic account
- Create a deployment
- Click on manage deployment and COPY the cloud ID 
- Navigate to elastic kibana
- Click on manage permissions bottom of kibana page
- Create a user under security section and setup password
- COPY user and password
- Add associate permissions to user for read and write indexes in elastic search
- Add cloud ID, user and password in .env file

