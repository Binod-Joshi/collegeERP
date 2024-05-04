# Modern collegeERP

## Live link
```bash
https://collegemanagementsystemm.netlify.app/
```
## About

The Blog App is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and Socket.io.

## Features

- #### User authentication:
  - Sign up, Log in, Log out.

- #### College management features:
  - Streamline college management, courses organization, and add students and faculty.
  - Organize courses, track attendance, assess performance, and facilitate communication.
  - Forget Pasword feature to recovery password.

## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB
- Recover Password: Nodemailer

## Installation

```bash
https://github.com/Binod-Joshi/collegeERP.git
```

Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend

```bash
cd collegeb
npm install
npm start
```

Create a file called .env in the backend folder. Inside it write this :

```bash
MONGO_URL = mongodb://127.0.0.1/college
```
Instead of this link write your database link.

Terminal 2: Setting Up Frontend

```bash
cd collegef
npm install
npm start
```
Now, navigate to localhost:3000 in your browser. The Backend API will be running at localhost:5000.

## Deployment
- Render - server side
- Netlify - client side
