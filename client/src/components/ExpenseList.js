import React, { useState } from "react";
import {Box,
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ExpenseList = ({ expenses, refreshExpenses }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/expenses/delete/${id}`);
            refreshExpenses();
        } catch (error) {
            alert("Error deleting expense");
        }
    };

    const handleExport = async () => {
        try {
            const response = await axios.get(`${API_URL}/expenses/export`, { responseType: "blob" });
        
            if (response.status !== 200) {
                throw new Error("Failed to download PDF");
            }
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expenses.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Export Error:", error);
            alert("Error exporting expenses");
        }
        
    }

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end">
                <Button onClick={handleExport} variant="contained" sx={{ margin: 2 }}>
                    Export to PDF
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell>{expense.category}</TableCell>
                                <TableCell>${expense.amount}</TableCell>
                                <TableCell>{expense.description || "N/A"}</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => handleDelete(expense.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={expenses.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default ExpenseList;
