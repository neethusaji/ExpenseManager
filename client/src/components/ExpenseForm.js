import React, { useState } from "react";
import {
    TextField, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ExpenseForm = ({ refreshExpenses }) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Expense");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/expenses/add`, { amount, category, description });
            refreshExpenses();
            setAmount("");
            setDescription("");
            handleClose();
        } catch (error) {
            alert("Error adding expense");
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} variant="contained" sx={{ margin: 2 }}>Add Expense</Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Amount"
                            fullWidth
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            margin="dense"
                        />
                        <TextField
                            select
                            label="Category"
                            fullWidth
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            margin="dense"
                        >
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem>
                        </TextField>
                        <TextField
                            label="Description"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="dense"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Add Expense</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ExpenseForm;
