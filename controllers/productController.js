import Product from "../models/product.js";
import Category from "../models/category.js";
import Supplier from "../models/supplier.js";

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = (page - 1) * perPage;

    const totalCount = await Product.count();
    const totalPages = Math.ceil(totalCount / perPage);

    const products = await Product.findAll({
      offset,
      limit: parseInt(perPage),
    });

    res.json({
      products,
      totalPages,
      currentPage: parseInt(page),
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { category_id, supplier_id } = req.body;

    if (!category_id || !supplier_id) {
      return res
        .status(400)
        .json({ message: "Category and supplier are required" });
    }

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const supplier = await Supplier.findByPk(supplier_id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { category_id, supplier_id } = req.body;

    if (!category_id || !supplier_id) {
      return res
        .status(400)
        .json({ message: "Category and supplier are required" });
    }

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const supplier = await Supplier.findByPk(supplier_id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await product.update(req.body);

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
