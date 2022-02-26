import * as React from 'react';
import Link from 'next/link'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(symbol:string, price:number, a:number, b:number, c:number) {
    return { symbol, price, a,b,c };
  }
  //tickers' data
  const rows = [
    createData('AAPL', 159, 6.0, 24, 4.0),
    createData('MSFT', 237, 9.0, 37, 4.3),
    createData('AMZN', 262, 16.0, 24, 6.0),
    createData('FB', 305, 3.7, 67, 4.3),
    createData('GOOG', 356, 16.0, 49, 3.9),
  ];

export default function SymbolTable(){
    return (
    <>
    <h1>I am rich!</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="left">&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="left">&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.symbol}>
              <StyledTableCell component="th" scope="row">
                  <Link href={{ pathname: '/stock/', query: { symbol: row.symbol }}}>
                    {row.symbol}
                  </Link>
              </StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
              <StyledTableCell align="left">{row.a}</StyledTableCell>
              <StyledTableCell align="left">{row.b}</StyledTableCell>
              <StyledTableCell align="left">{row.c}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
}