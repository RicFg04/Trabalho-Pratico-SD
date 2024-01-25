import React, { useEffect, useState } from 'react';
import {Box, Button, CircularProgress, Container, TextField} from '@mui/material';

async function fetchSales() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/findAllSales`);
    const data = await response.json();
    return data;
}

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
    const [sales, setSales] = useState(null);
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
        fetchSales()
            .then(data => setSales(data))
            .catch(error => console.error('Error:', error));
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
                            sales.map(sale=>(
                                <li key={sale.id}>
                                    <p>Item description: {sale.item_description}</p>
                                    <p>Supplier: {sale.supplier}</p>
                                    <p>RTL Transfers: {sale.rtl_transfers}</p>
                                    <p>Item Type: {sale.item_type}</p>
                                    <p>Calendar Month Number: {sale.cal_month_num}</p>
                                    <p>Item Code: {sale.item_code}</p>
                                    <p>Calendar Year: {sale.calendar_year}</p>
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