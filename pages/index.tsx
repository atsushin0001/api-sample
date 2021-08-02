import { useState } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Book from '../models/Book'
import SearchResults from "../components/SearchResults";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const getBooks = async (keywords: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${keywords}`;
  const {
    data: { items },
  } = await axios.get(url);
  // console.log(items)
  return items;
};

const BookSearch = () => {
  const [keywords, setKeywords] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  return (
      <div>
        <Head>
          <title>Book Search</title>
        </Head>
        <h1>Book Search</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const books: Book[] = await getBooks(keywords);
            setBooks(books);
          }}
        >
          <TextField id="searchInput" label="title" variant="outlined" onChange={e => setKeywords(e.target.value)}/>
          <br/><br/>
          <Button type="submit" variant="contained" color="primary">Search</Button>
        </form>
        <hr/>
        <SearchResults books={books} /> 
    </div>
  );
};

export default BookSearch;