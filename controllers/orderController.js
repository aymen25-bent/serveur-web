import Order from "../models/order.js";
import User from "../models/user.js";
import Supplier from "../models/supplier.js";
import Product from "../models/product.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: ["user", "supplier"],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ["user", "supplier"],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { user_id, supplier_id, product_id } = req.body;

    if (!user_id || !supplier_id || !product_id) {
      return res
        .status(400)
        .json({ message: "user_id, supplier_id, and product_id are required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const supplier = await Supplier.findByPk(supplier_id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { user_id, supplier_id, product_id } = req.body;

    if (!user_id || !supplier_id || !product_id) {
      return res
        .status(400)
        .json({ message: "user_id, supplier_id, and product_id are required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const supplier = await Supplier.findByPk(supplier_id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
