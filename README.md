# Book Library Web App

A Node.js and Express web application to manage a personal library of books with ratings and notes. Users can add, edit, delete, and view books, with images fetched automatically from the IT Book API.

---

## Features

* Display a list of books with ratings, notes, and cover images.
* Add new books with title, author, notes, and rating.
* Edit or delete existing books.
* Images automatically fetched using the IT Book API.
* Responsive design for desktop and mobile.
* Simple, clean user interface using custom CSS.

---

## Tech Stack

* Node.js
* Express.js
* EJS templating
* PostgreSQL (pg module)
* Axios (for fetching book images)
* HTML/CSS for frontend

---

## Usage

1. Install dependencies:

   ```bash
   npm install express pg axios ejs
   ```
2. Set up PostgreSQL database:

   ```sql
   CREATE DATABASE book;
   CREATE TABLE library (
       id SERIAL PRIMARY KEY,
       name TEXT,
       author TEXT,
       note TEXT,
       rating FLOAT,
       img TEXT
   );
   ```
3. Configure database connection in `index.js` (consider using environment variables for security):

   ```js
   const db = new pg.Client({
     user: process.env.DB_USER,
     host: process.env.DB_HOST,
     database: process.env.DB_NAME,
     password: process.env.DB_PASSWORD,
     port: process.env.DB_PORT,
   });
   ```
4. Run the server:

   ```bash
   node index.js
   ```
5. Open your browser at `http://localhost:3000`.

---

## Environment Variables Recommended

* `DB_USER` – PostgreSQL username
* `DB_PASSWORD` – PostgreSQL password
* `DB_HOST` – Database host (default: localhost)
* `DB_PORT` – Database port (default: 5432)
* `DB_NAME` – Database name

These help secure your database credentials and allow easy configuration for different environments.

