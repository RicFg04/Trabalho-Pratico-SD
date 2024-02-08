import React, { useEffect, useState } from 'react';
import {Box, Button, CircularProgress, Container, TextField} from '@mui/material';

async function createSale(sale) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/createSale`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sale)
    });
    const data = await response.json();
    return data;

}


function Sales() {
    const [sales, setSales] = useState([]);
    const [newSale, setNewSale] = useState({});

    const handleInputChange = (event) => {
        setNewSale({
            ...newSale,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        createSale(newSale)
            .then(data => {
                setSales([...sales, data]);
                setNewSale({});
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        fetch("http://localhost:8080/sales")
            .then((res) => res.json())
            .then((res)=>{
                setSales(res);
            });
            //.then(data => setSales(data))
            //.catch(error => console.error('Error:', error));
    }, []);

    return (
        <Container maxWidth="100%" sx={{ backgroundColor: 'background.default', padding: "2rem", borderRadius: "1rem", color:"white" }}>
            <h2>Sales</h2>
            <form onSubmit={handleFormSubmit}>
                <TextField name="item_description" value={newSale.item_description || ''} onChange={handleInputChange} label="Item description"/>
                <TextField name="supplier" value={newSale.supplier || ''} onChange={handleInputChange} label="Supplier"/>
                <TextField name="rtl_transfers" value={newSale.rtl_transfers || ''} onChange={handleInputChange} label="RTL Transfers"/>
                <TextField name="item_type" value={newSale.item_type || ''} onChange={handleInputChange} label="Item Type"/>
                <TextField name="cal_month_num" value={newSale.cal_month_num || ''} onChange={handleInputChange} label="Calendar Month Number"/>
                <TextField name="item_code" value={newSale.item_code || ''} onChange={handleInputChange} label="Item Code"/>
                <TextField name="calendar_year" value={newSale.calendar_year || ''} onChange={handleInputChange} label="Calendar Year"/>
                <Button type="submit">Add Sale</Button>
            </form>
            {
                sales ?
                    <ul>
                        {
                            sales.map(sales=>(
                                <li key={sales.id}>
                                    <p>Item description: {sales.item_description}</p>
                                    <p>Supplier: {sales.supplier}</p>
                                    <p>RTL Transfers: {sales.rtl_transfers}</p>
                                    <p>Item Type: {sales.item_type}</p>
                                    <p>Calendar Month Number: {sales.cal_month_num}</p>
                                    <p>Item Code: {sales.item_code}</p>
                                    <p>Calendar Year: {sales.calendar_year}</p>
                                </li>
                            ))
                        }
                    </ul> :
                    <CircularProgress />
            }
        </Container>
    );
}

export default Sales;