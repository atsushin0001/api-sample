import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Book from '../models/Book'
import SearchResults from "../components/SearchResults";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { parseISO, format } from 'date-fns'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  customButton: {
    marginRight: "5px"
  },
}));

const getBooks = async (keywords: string) => {
  // const url = `https://www.googleapis.com/books/v1/volumes?q=${keywords}`;
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
  
  console.log(itemsData)
  return itemsData;
};



const BookSearch = () => {
  const classes = useStyles();

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
      <div className={classes.root}>
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
          <Button type="submit" className={classes.customButton} variant="contained" color="primary">Search</Button>
          <Link href="/regist">
            <Button type="button" className={classes.customButton} variant="contained" color="secondary">Regist</Button>
          </Link>
        </form>
        
        <hr/>
        <SearchResults books={books} keywords={keywords}/> 
    </div>
  );
};

export default BookSearch;