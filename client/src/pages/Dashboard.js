import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    const refreshExpenses = async () => {
        try {
            const res = await axios.get(`${API_URL}/expenses/list`);
            setExpenses(res.data.expenses);
        } catch (error) {
            alert("Error fetching expenses");
        }
    };

    useEffect(() => {
        refreshExpenses();
    }, []);

    return (
        <div>
            <ExpenseForm refreshExpenses={refreshExpenses} />
            <ExpenseList expenses={expenses} refreshExpenses={refreshExpenses} />
        </div>
    );
};

export default Dashboard;
