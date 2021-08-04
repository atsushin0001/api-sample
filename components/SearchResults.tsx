import Book from "../models/Book";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Image from 'next/image'
import noImage from '../public/noImage.png'

const SearchResults = ({ books }: { books: Book[] }) =>
  books.length > 0 ? (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#F2F2F2" }}>
            <TableCell size="medium">image</TableCell>
            <TableCell>title</TableCell>
            {/* <TableCell>description</TableCell> */}
            <TableCell>publisher</TableCell>
            <TableCell>published Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell>
                {book.image.length > 0 ? 
                  <Image
                    src={book.image}
                    alt="本の画像"
                    layout={"responsive"}
                    width={400}
                    height={500}
                  />
                :
                  <Image
                    src={noImage}
                    alt="本の画像"
                    layout={"responsive"}
                    width={400}
                    height={500}
                  />
                }
              </TableCell>
              <TableCell>{book.title}</TableCell>
              {/* <TableCell>{book.description}</TableCell> */}
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.publishedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className="empty-state" />
  );

export default SearchResults;
