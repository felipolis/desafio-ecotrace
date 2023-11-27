import crypto from "crypto";

export function setPassword (password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  return {
    salt,
    hash
  };
}

export function validPassword (password: string, dbPassword: string, salt: string)  {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return dbPassword === hash;
}