'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import Header from '@/components/ui/header'

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto  px-4  pt-32  text-center">
        <h1 className="h1 mb-4" data-aos="fade-up">Test Page</h1>

        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
        <div className="max-w-4xl mx-auto text-center pb-12">

          <h1 className="h1 mb-4" data-aos="fade-up">SolanaDama</h1>
          <p className="text-xl text-white-100 mb-8" data-aos="fade-up" data-aos-delay="200">
            The Reliability CryptoMunity Platform powered by Dama Token
          </p>

          <p className="text-justify text-xl text-gray-500 dark:text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
            SolanaDama is a cutting-edge platform designed to assess the reliability of new cryptocurrency tokens.
            Offering a set of versatile tools, we provide transparent and reliable evaluations of tokens,
            enabling investors to make informed decisions and reducing the risk of falling victim to fraudulent schemes.
          </p>
          <p className="text-justify text-xl text-gray-500 dark:text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">

            Furthermore SolanDama serves as a bridge between investors and emerging crypto ventures, facilitating seamless engagement and investment opportunities in the
            dynamic world of cryptocurrency. Leveraging with our tools we offers a secure and efficient environment
            for investors to discover, evaluate, and participate in promising token projects, fostering a vibrant community of crypto enthusiasts and empowering
            startups to thrive in the digital economy. Join SolanaDama today and be at the forefront of the next wave of innovation in crypto investment.
          </p>

        </div>

      </div>
    </>
  );
}