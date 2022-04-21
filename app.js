const express = require("express");
const { get } = require("express/lib/response");
const app = express();

const db = require("./src/config/db");

app.get("/", (req, res) => res.send("respon node JS Berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() => console.log("berhasil terkonesi ke database"));

const User = require("./src/models/user");

// CREATE

app.post("/crud", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// READ

app.get("/crud", async (req, res) => {
  try {
    const getAllUser = await User.findAll({});

    res.json(getAllUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// READ BY ID

app.get("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const getUser = await User.findOne({
      where: { id: id },
    });

    res.json(getUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// DELETE

app.delete("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await User.destroy({
      where: { id: id },
    });

    await deleteUser;

    res.json({ delete: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//PUT

app.put("/crud/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.params.id;

    const updateUser = await User.update(
      {
        username,
        email,
        password,
      },
      { where: { id: id } }
    );

    await updateUser;

    res.json("berhasil di update");

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.listen(4500, () => console.log("port berjalan di 4500"));
