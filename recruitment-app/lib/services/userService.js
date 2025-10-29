import { hashPassword } from "@/lib/auth/utils";
import { userRepository } from "@/lib/repositories/userRepository";

async function registerUser(data) {
  const { name, email, password, role } = data;

  // Verify if email already exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Repository to create user
  const newUser = await userRepository.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });

  return newUser;
}

export const userService = {
  registerUser,
};
