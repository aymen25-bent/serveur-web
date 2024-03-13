import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, "password", { expiresIn: "1h" }); // Change this to your secret key and expiration time
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "password"); // Change this to your secret key
    return decoded;
  } catch (error) {
    return null;
  }
};
