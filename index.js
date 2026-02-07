import express from "express";
import pg from "pg";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
db.connect();

let data = [
  { id: 1, name: "Book 1", author: "Author 1", note: "Note 1", rating: 5 },
];
let id = "";
async function getBooks() {
  const result = await db.query("SELECT * FROM library ORDER BY rating DESC");
  data = result.rows;
  console.log("Books retrieved from database:", data);
  return data;
}

async function addBooks(newItem) {
  const name = newItem.name.replaceAll(" ", "-");
  const imageURL = await axios.get(
    `https://api.itbook.store/1.0/search/${name}`,
  );
  await db.query(
    "INSERT INTO library (name, author, note, rating, img) VALUES ($1, $2, $3, $4, $5)",
    [
      newItem.name,
      newItem.author,
      newItem.notes,
      newItem.rating,
      imageURL.data.books[0].image,
    ],
  );
}

async function editBooks(updateItem, id) {
  const name = updateItem.name.replaceAll(" ", "-");
  const imageURL = await axios.get(
    `https://api.itbook.store/1.0/search/${name}`,
  );
  await db.query(
    "UPDATE library SET name = ($1), author = ($2), note = ($3), rating = ($4), img = ($5) WHERE id = $6",
    [
      updateItem.name,
      updateItem.author,
      updateItem.notes,
      updateItem.rating,
      imageURL.data.books[0].image,
      id,
    ],
  );
}

async function deleteBooks(deletedItemId) {
  await db.query("DELETE FROM library WHERE id = $1", [deletedItemId]);
}

app.get("/", async (req, res) => {
  const books = await getBooks();
  res.render("view.ejs", { books: books });
});

app.get("/add", (req, res) => {
  res.render("form.ejs", { isEdit: false });
});

app.post("/add", async (req, res) => {
  const newItem = req.body;
  await addBooks(newItem);
  res.redirect("/");
});

app.get("/edit", (req, res) => {
  id = req.query.updatedItemId;
  res.render("form.ejs", { isEdit: true });
});

app.post("/edit", async (req, res) => {
  const updateItem = req.body;
  await editBooks(updateItem, id);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  await deleteBooks(id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
