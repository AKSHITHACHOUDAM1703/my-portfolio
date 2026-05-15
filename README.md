# Personal Portfolio Website

A full-stack personal portfolio website built to showcase my skills, projects, and contact details. The contact form is connected to a Node.js/Express backend and stores messages in MongoDB.

## Features

- Responsive portfolio website
- About, skills, projects, and contact sections
- Contact form with frontend and backend validation
- Backend API using Node.js and Express
- MongoDB database integration for storing contact messages

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

## Project Structure

```text
INTERNSHIP/
|-- public/
|   |-- index.html
|   |-- style.css
|   `-- javascript.js
|-- server.js
|-- db.js
|-- contactModel.js
|-- package.json
|-- package-lock.json
|-- .gitignore
`-- README.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

3. Start the server:

```bash
npm start
```

4. Open the app:

```text
http://127.0.0.1:5000
```
