import Book from "../models/Book";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Image from 'next/image';
import noImage from '../public/noImage.png';
import { parseISO, format } from 'date-fns';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';


const SearchResults = ({ books, keywords }: { books: Book[], keywords: string }) => {
  const router = useRouter(); 

  const deleteBook = async (id: string) => {
    const url = `https://localhost:44368/api/BookItems/`;
    const {
      data
  　} = await axios
      .delete(url + id);
  
      if (data) await getBooks(keywords);

      alert('削除しました。　ID:' + id);

  };
  
  const editBook = async (book: Book) => {
    router.push({
      pathname:"/edit",   //URL
      query: {
        id: book.id,
        title: book.title,
        description: book.description,
        publisher: book.publisher,
        publisheddate: format(book.publisheddate, 'yyyy-MM-dd'),
      } 
    });
  };
  
  const getBooks = async (keywords: string) => {
    const url = `https://localhost:44368/api/BookItems/${keywords}`;
    const {
      data
    } = await axios.get(url);
  
    const itemsData = data.map(item => {
      // const vi = item.volumeInfo;
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        publisher: item.publisher,
        publisheddate: parseISO(item.publisheddate),
        image: item.image,
      }; 
    });  
    
    console.log(itemsData);

    books = itemsData;
  };

  return (
  books.length > 0 ? (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#F2F2F2" }}>
            {/* <TableCell size="medium">image</TableCell> */}
            <TableCell>title</TableCell>
            <TableCell>description</TableCell>
            <TableCell>publisher</TableCell>
            <TableCell>published Date</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow key={book.id}>
              {/* <TableCell>
                {book.image.length > 0 ? 
                  <Image
                    src={book.image}
                    alt="Picture of the book"
                    layout={"responsive"}
                    width={400}
                    height={500}
                  />
                :
                  <Image
                    src={noImage}
                    alt="Picture of the book"
                    layout={"responsive"}
                    width={400}
                    height={500}
                  />
                }
              </TableCell> */}
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{format(book.publisheddate, 'yyyy-MM-dd')}</TableCell>
              <TableCell>
                <Button type="button" style={{ marginRight: "10px" }} variant="contained" color="secondary" onClick={ async ()=> editBook(book)}>Edit</Button>
                <Button type="button" variant="contained" color="default" onClick={ async ()=> deleteBook(book.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div />
  ))};

export default SearchResults;
