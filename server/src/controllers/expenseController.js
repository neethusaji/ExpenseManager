const Expense = require("../models/Expense");
const PDFGenerator = require("../utils/pdfGenerator");

exports.addExpense = async (req, res) => {
    try {
        const { amount, category, description } = req.body;
        const expense = await Expense.create({ amount, category, description });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await Expense.destroy({ where: { id } });
        res.json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.listExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        const totalIncome = expenses.filter(e => e.category === "Income").reduce((sum, e) => sum + e.amount, 0);
        const totalExpense = expenses.filter(e => e.category === "Expense").reduce((sum, e) => sum + e.amount, 0);

        res.json({ totalIncome, totalExpense, expenses });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.exportToPDF = async (req, res) => {
    try {
        const expenses = await Expense.findAll();

        if (!expenses || expenses.length === 0) {
            return res.status(400).json({ message: "No expenses found" });
        }

        const rawExpenses = expenses.map(exp => exp.get({ plain: true }));
        const pdfData = await PDFGenerator.generate(rawExpenses);

        if (!pdfData || pdfData.length === 0) {
            console.error("Generated PDF is empty!");
            return res.status(500).json({ message: "PDF generation failed" });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="expenses.pdf"');
        res.setHeader("Content-Length", pdfData.length);
        res.end(pdfData);
    } catch (error) {
        console.error("Error exporting PDF:", error);
        res.status(500).json({ message: "Server error", error: error.stack || error.message || error });
    }

};
