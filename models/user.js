const db = require("../db");
const Joi = require("joi");
const argon2 = require("argon2");

module.exports.emailAlreadyExists = (email) =>
  db.user.findFirst({ where: { email } }).then((user) => !!user);

module.exports.validateUser = (data, forUpdate = false) =>
  Joi.object({
    email: Joi.string()
      .email()
      .max(255)
      .presence(forUpdate ? "optional" : "required"),
    password: Joi.string()
      .min(8)
      .max(100)
      .presence(forUpdate ? "optional" : "required"),
    name: Joi.string()
      .max(255)
      .presence(forUpdate ? "optional" : "required"),
    image: Joi.string().max(255).allow(null, ""),
  }).validate(data, { abortEarly: false }).error;

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2.argon2id,
};

const hashPassword = (plainPassword) =>
  argon2.hash(plainPassword, hashingOptions);

module.exports.hashPassword = hashPassword;

const verifyPassword = (plainPassword, hashedPassword) =>
  argon2.verify(hashedPassword, plainPassword, hashingOptions);

module.exports.verifyPassword = verifyPassword;

module.exports.createUser = async ({
  email,
  password,
  name,
  role,
  image,
  emailVerificationCode,
}) => {
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: { email, hashedPassword, name, role, image, emailVerificationCode },
  });
};

module.exports.getSafeAttributes = (user) => ({
  ...user,
  hashedPassword: undefined,
});

module.exports.deleteAllUsers = db.user.deleteMany;

module.exports.findByEmail = async (email = "") =>
  db.user.findUnique({ where: { email } });
