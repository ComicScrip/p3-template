import {
  createUser,
  emailAlreadyExists,
  getSafeAttributes,
  validateUser,
} from "../../../models/user";

async function handlePost(req, res) {
  const validationErrors = validateUser(req.body);
  if (validationErrors) return res.status(422).send(validationErrors.details);
  if (await emailAlreadyExists(req.body.email))
    return res.status(409).send("email already exists");
  const newUser = await createUser(req.body);
  res.send(getSafeAttributes(newUser));
}

export default async function handler(req, res) {
  if (req.method === "POST") handlePost(req, res);
  else res.status(405).send();
}
