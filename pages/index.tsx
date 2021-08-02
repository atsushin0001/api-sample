import { useState, useRef, ChangeEvent } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Book from '../models/Book'
import SearchResults from "../components/SearchResults";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const getBooks = async (keywords: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${keywords}`;
  const {
    data: {
       items 
      },
  } = await axios.get(url);

  // 必要なものだけ抜き出してわかりやすいフォーマットに変更する
  const itemsData = items.map(item => {
    const vi = item.volumeInfo;
    return {
      title: vi.title,
      description: vi.description,
      publisher: vi.publisher,
      publishedDate: vi.publishedDate,
      image: vi.imageLinks ? vi.imageLinks.smallThumbnail : '',
    }; 
  });  
  
  console.log(itemsData)
  return itemsData;
};

const BookSearch = () => {
  const [keywords, setKeywords] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);

  const handleChange = (e) => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }
    setKeywords(e.target.value)
  };
  
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
          <TextField 
            id="searchInput" 
            label="title" 
            variant="outlined" 
            defaultValue=""
            inputRef={inputRef}
            error={inputError}
            inputProps={{ required: true, maxLength: 20 }}
            helperText={inputRef?.current?.validationMessage}
            onChange={e => handleChange(e)}
          />
          <br/><br/>
          <Button type="submit" variant="contained" color="primary">Search</Button>
        </form>
        <hr/>
        <SearchResults books={books} /> 
    </div>
  );
};

export default BookSearch;