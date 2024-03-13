import StockTransaction from "../models/stockTransaction.js";
import Product from "../models/product.js";

export const getAllStockTransactions = async (req, res) => {
  try {
    const stockTransactions = await StockTransaction.findAll();
    res.status(200).json(stockTransactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStockTransaction = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: "product_id is required" });
    }

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const stockTransaction = await StockTransaction.create(req.body);
    res.status(201).json(stockTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStockTransaction = async (req, res) => {
  try {
    const stockTransaction = await StockTransaction.findByPk(req.params.id);

    if (!stockTransaction) {
      return res.status(404).json({ message: "Stock Transaction not found" });
    }

    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: "product_id is required" });
    }

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await stockTransaction.update(req.body);
    res.status(200).json(stockTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStockTransaction = async (req, res) => {
  try {
    const stockTransaction = await StockTransaction.findByPk(req.params.id);

    if (!stockTransaction) {
      return res.status(404).json({ message: "Stock Transaction not found" });
    }

    await stockTransaction.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
