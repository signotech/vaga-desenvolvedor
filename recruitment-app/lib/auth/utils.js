import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido");
  }
}
