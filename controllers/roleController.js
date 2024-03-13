import Role from "../models/role.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const newRole = await Role.create(req.body);

    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findOne({ where: { id } });

    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }

    const [updated] = await Role.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedRole = await Role.findOne({ where: { id } });

      res.status(200).json(updatedRole);
    } else {
      throw new Error("Role not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Role.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(204).json({ message: "Role deleted" });
    } else {
      throw new Error("Role not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
