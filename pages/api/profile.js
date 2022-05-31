import { getSession } from "next-auth/react";
import { findByEmail, getSafeAttributes } from "../../models/user";

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log("session", session);
  res.send(getSafeAttributes(await findByEmail(session.user.email)));
}
