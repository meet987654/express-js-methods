const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const jwtpassword = "123456";
app.use(express.json());

const ALL_USERS = [
  { username: "user1", password: "password1", name: "name1" },
  { username: "user2", password: "password2", name: "name2" },
  { username: "user3", password: "password3", name: "name3" }
];

function userExists(username, password) {
  // Correct the logic for userExist
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].username === username && ALL_USERS[i].password === password) {
      return true; // Return true as soon as the user is found
    }
  }
  return false;
}

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(404).json({
      msg: "User does not exist",
    });
  }

  const token = jwt.sign({ username: username }, jwtpassword);

  // Correctly return the token as a JSON response
  return res.json({
    msg: "Sign-in successful",
    token: token
  });
});

app.get("/users",(req,res)=>{
  const token = req.headers.authorization;
  const decoded=jwt.verify(token,jwtpassword);
  const username=decoded.username;
  return res.json({
    msg:"Users",
    users:ALL_USERS
  })
})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
