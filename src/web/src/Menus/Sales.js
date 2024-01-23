import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

async function fetchSales() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sales`);
    const data = await response.json();
    return data;
}

function Sales() {
    const [sales, setSales] = useState(null);

    useEffect(() => {
        fetchSales()
            .then(data => setSales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <Container maxWidth="100%" sx={{ backgroundColor: 'background.default', padding: "2rem", borderRadius: "1rem" }}>
            <h2>Sales</h2>
            {
                sales ?
                    <ul>
                        {
                            sales.map(sale => <li key={sale.id}>{sale.name}</li>)
                        }
                    </ul> :
                    <CircularProgress />
            }
        </Container>
    );
}

export default Sales;