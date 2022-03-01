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
  
  
  
 

export default function SymbolTable({stocks}:any){
  
  const aapl=stocks.data.getStocks[2];
  const msft=stocks.data.getStocks[0];
  const amzn=stocks.data.getStocks[4];
  const fb=stocks.data.getStocks[3];
  const goog=stocks.data.getStocks[1];
  console.log('fb',fb)
  
  function createData(symbol:string, price:number, change:number, prev:number) {
    
    return { symbol, price, change,prev };
  }
  function changes(symbol:any){
    let change:number=(symbol.close[fb.close.length-2]-symbol.close[fb.close.length-1])/symbol.close[fb.close.length-1];
    change = Number(change.toFixed(2))
    return change
  }

  function rowData(symbol:any){
    const obj:any={}
    obj.price = symbol.close.slice(-1);
    obj.change = ((symbol.close[fb.close.length-2]-symbol.close[fb.close.length-1])/symbol.close[fb.close.length-1]).toFixed(2);
    obj.prev = symbol.close[fb.close.length-2]; 

    return obj;
  }

  //tickers' data
  const rows = [
    createData('AAPL',rowData(aapl).price, rowData(aapl).change, rowData(aapl).prev),
    createData('MSFT', rowData(msft).price, rowData(msft).change, rowData(msft).prev),
    createData('AMZN', rowData(amzn).price, rowData(amzn).change, rowData(amzn).prev),
    createData('FB', rowData(fb).price, rowData(fb).change, rowData(fb).prev),
    createData('GOOG', rowData(goog).price, rowData(goog).change, rowData(goog).prev),
  ];
    return (
    <>
    <h1>I am rich!</h1>
    <h1>{aapl.symbol}</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Change</StyledTableCell>
            <StyledTableCell align="left">Prev Close</StyledTableCell>
            {/* <StyledTableCell align="left">&nbsp;(g)</StyledTableCell> */}
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
              <StyledTableCell className= {row.change >= 0 ?  'change1': 'change2'} align="left">{row.change} %</StyledTableCell>
              <StyledTableCell align="left">{row.prev}</StyledTableCell>
              {/* <StyledTableCell align="left">{row.c}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
}