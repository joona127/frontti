import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

function Carlist() {
    const [cars, setCars] = useState([]);

    const gridRef = useRef();

    useEffect(() => {
      getCars();
    }, [])
    

    const getCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {
            method: 'DELETE'
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCars()}))
        .catch(err => console.error(err))
        }
    }

    const columns = [
        {headerName: 'Brand', field: 'brand', sortable: true, filter: true},
        {headerName: 'Model', field: 'model', sortable: true, filter: true},
        {headerName: 'Color', field: 'color', sortable: true, filter: true},
        {headerName: 'Fuel', field: 'fuel', sortable: true, filter: true},
        {headerName: 'Year', field: 'year', sortable: true, filter: true},
        {headerName: 'Price', field: 'price', sortable: true, filter: true},
        {
            headerName: '', 
            field: '_links.self.href', 
            width: 90, 
            cellRendererFramework: params => 
            <Button color="secondary" size="small" 
            onClick={() => deleteCar(params.value)}>
                Delete</Button>
        }
    ]
return (
    <div className="ag-theme-material" style={{height:'700px', width:'90%', margin:'auto'}}>
        <AgGridReact
        ref={gridRef}
        suppressCellSelection={true}
        onGridReady={ params => {
         gridRef.current = params.api
        }}
            columnDefs={columns}
            rowData={cars}
            >
        </AgGridReact>
    </div>
);
}

export default Carlist;