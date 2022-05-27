const { createUser, deleteAllUsers } = require("../models/user");

async function seed() {
  await deleteAllUsers();
  await await createUser({
    email: "dave.lopper@gmail.com",
    name: "Dave Lopper",
    password: "superpassword",
  });
}

seed();

module.exports = seed;
