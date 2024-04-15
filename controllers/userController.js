import User from "../models/user.js";
import passport from "passport";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwtUtils.js";
import Role from "../models/role.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    // send a request to a weather api to get data of the next year
    // const weather = await fetch('https://api.weatherapi.com/v1/current.json
    // ?key=YOUR_API_KEY&q=Paris&aqi=no')

    // if (weather.status !== 200) {
    //   throw new Error('Error getting weather data')
    // }

    // const weatherData = await weather.json()

    const weatherData = [];

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoggedUser = async (req, res) => {
  try {
    // Assuming you have authentication middleware that sets req.user
    const loggedUser = req.user;
    res.json(loggedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const exist = await User.findOne({ where: { email: req.body.email } });

    if (exist) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const role = await Role.findOne({ where: { id: req.body.role_id } });

    if (!role) {
      res.status(400).json({ message: "Role not found" });
      return;
    }

    const newUser = await User.create({
      ...req.body,
      photoPath: req.body.photo,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const exist = await User.findOne({ where: { email: req.body.email } });

    if (exist) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const role = await Role.findOne({ where: { id: req.body.role_id } });

    if (!role) {
      res.status(400).json({ message: "Role not found" });
      return;
    }

    const [updated] = await User.update(
      {
        ...req.body,
        photoPath: req.body.photo,
      },
      {
        where: { id },
      }
    );
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      res.json(updatedUser);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id },
    });
    if (deleted) {
      res.json({ message: "User deleted successfully" });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    //login user with jwt strategy
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      phoneNumber,
      photo,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const exist = await User.findOne({ where: { email } });

    if (exist) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const role = await Role.findOne({ where: { name: "user" } });

    if (!role) {
      // Create default roles if they don't exist
      Role.findOrCreate({
        where: { name: "admin" },
        defaults: { name: "admin" },
      });
      Role.findOrCreate({
        where: { name: "user" },
        defaults: { name: "user" },
      });
      return;
    }

    const newUser = await User.create({
      password: hashedPassword,
      firstName,
      lastName,
      email,
      birthDate,
      phoneNumber,
      role_id: role.id,
      photoPath: photo,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: error.message });
  }
};
