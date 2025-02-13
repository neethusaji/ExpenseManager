const express = require("express");
const { addExpense, deleteExpense, listExpenses, exportToPDF } = require("../controllers/expenseController");

const router = express.Router();
router.post("/add", addExpense);
router.delete("/:id", deleteExpense);
router.get("/list", listExpenses);
router.get("/export", exportToPDF);

module.exports = router;
