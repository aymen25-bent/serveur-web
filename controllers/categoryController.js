import Category from "../models/category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ where: { id } });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const [updated] = await Category.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedCategory = await Category.findOne({ where: { id } });

      res.status(200).json(updatedCategory);
    } else {
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Category.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(204).json({ message: "Category deleted" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
