import Book from "../models/Book";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const SearchResults = ({ books }: { books: Book[] }) =>
  books.length > 0 ? (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#F2F2F2" }}>
            <TableCell size="medium">title</TableCell>
            <TableCell>publisher</TableCell>
            <TableCell>published Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell component="th" scope="row">{book.volumeInfo.title}</TableCell>
              <TableCell>{book.volumeInfo.publisher}</TableCell>
              <TableCell>{book.volumeInfo.publishedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className="empty-state" />
  );

export default SearchResults;
