import jwt, { JwtPayload } from "jsonwebtoken";

const jwtPassword = process.env.NEXT_PUBLIC_JWT_PASS as string;

function encrypt(text: string, expires?: string): string {
  return jwt.sign({ data: text }, jwtPassword, {
    expiresIn: expires || "9999w",
  });
}

function decrypt(encryptedText: string): string {
  const jwtData = jwt.verify(encryptedText, jwtPassword) as JwtPayload;
  return jwtData.data;
}

export { encrypt, decrypt };
