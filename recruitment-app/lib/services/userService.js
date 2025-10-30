import { hashPassword } from "@/lib/auth/utils";
import { userRepository } from "@/lib/repositories/userRepository";

async function registerUser(data) {
  const { name, email, password, role, phone, bio, portfolio, resumeUrl } = data;

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
    phone,
    bio,
    portfolio,
    resumeUrl,
  });

  return newUser;
}

async function login(data) {
  const { email, password } = data;

  // Verify if user exists
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Email inválido ou senha inválida");
  }

  // Verify if password is corret
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw new Error("Email inválido ou senha inválida");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { user, token };
}

async function updateUser(id, data) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  const { name, email, phone, bio, portfolio, resumeUrl } = data;
  const updatedData = { name, email, phone, bio, portfolio, resumeUrl };  
  return await userRepository.updateById(id, updatedData);
}

export const userService = {
  registerUser,
  login,
  updateUser,
};
