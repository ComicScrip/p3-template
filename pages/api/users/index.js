import {
  createUser,
  validateUser,
  emailAlreadyExists,
} from "../../../models/user";

async function handlePost(req, res) {
  const validationErrors = validateUser(req.body);
  if (validationErrors) return res.status(422).send(validationErrors.details);
  if (await emailAlreadyExists(req.body.email)) return res.status(409).send();
  res.status(201).send(await createUser(req.body));
}

export default function handler(req, res) {
  if (req.method === "POST") handlePost(req, res);
  else res.status(405).send("method not allowed");
}
