require("dotenv").config();

const express = require("express");
const session = require("express-session");
const massive = require("massive");
const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authCtrl');

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.get('/api/auth/getUser', authCtrl.getUser);
app.delete('/api/auth/logout', authCtrl.logout);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    app.set("db", db);
    console.log("Db connected.");
    app.listen(SERVER_PORT, () =>
      console.log(`Sever running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
