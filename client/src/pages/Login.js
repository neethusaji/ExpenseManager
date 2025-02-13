import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post(`${API_URL}/users/login`, { email, password }, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("res",res.data);
    
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            alert("Error: " + (error.response?.data?.message || "Login failed"));
        }
    };

    return (
        <Container maxWidth="sm">
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    height: "100vh" 
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                
                <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "350px" }}>
                    <TextField 
                        label="Email" 
                        fullWidth 
                        size="small"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        sx={{ mb: 2 }}
                    />
                    
                    <TextField 
                        label="Password" 
                        type="password" 
                        fullWidth 
                        size="small"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        sx={{ mb: 2 }}
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        sx={{ mb: 1 }}
                    >
                        Login
                    </Button>

                    <Button 
                        variant="outlined" 
                        fullWidth 
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
