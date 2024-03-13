import Supplier from "../models/supplier.js";

export const createSupplier = async (req, res) => {
  try {
    const newSupplier = await Supplier.create(req.body);

    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Supplier.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(204).json({ message: "Supplier deleted" });
    } else {
      throw new Error("Supplier not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findOne({ where: { id } });

    if (!supplier) {
      res.status(404).json({ message: "Supplier not found" });
      return;
    }

    const [updated] = await Supplier.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedSupplier = await Supplier.findOne({ where: { id } });

      res.status(200).json(updatedSupplier);
    } else {
      throw new Error("Supplier not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
