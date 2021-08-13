import { useState, useRef, ChangeEvent } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Book from '../models/Book'
import BookRegist from '../models/BookRegist'
import SearchResults from "../components/SearchResults";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { parseISO, format } from 'date-fns'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    customButton: {
      marginRight: "5px",
    },
    textField: {
        margintop: theme.spacing(5),
    },
  }));
  
const data: Book = {
    id: '',
    title: '',
    description: '',
    publisher: '',
    publisheddate: null,
    image: '',
};

const BookEditer = () => {
  const router = useRouter();
  
  const classes = useStyles();
  
  data.id = String(router.query.id);
  data.title = String(router.query.title);
  data.description = String(router.query.description);
  data.publisher = String(router.query.publisher);
  data.publisheddate = parseISO(String(router.query.publisheddate));

  const [formData, setFormData] = useState<Book>(data);
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
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  const editBook = async (formData) => {
    console.log(formData);
    const url = `https://localhost:44368/api/BookItems/${router.query.id}`;
    const {
        data
     } = await axios.put(url, formData);
  
    return data;
  };


  return (
      <div className={classes.root}>
        <Head>
          <title>Book Edit</title>
        </Head>
        <h1>Book Edit</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const book: Book = await editBook(formData);
            alert('編集しました。　ID:' + router.query.id);
          }}
        >
          <TextField 
            id="id" 
            type="hidden"
            defaultValue={router.query.id}
          />
          <br/>
          <TextField 
            id="title" 
            label="title" 
            variant="outlined" 
            defaultValue={router.query.title}
            className={classes.textField}
            inputRef={inputRef} 
            error={inputError}
            inputProps={{ required: true, maxLength: 20 }}
            helperText={inputRef?.current?.validationMessage}
            onChange={e => handleChange(e)}
          />
          <br/>
          <TextField 
            id="description" 
            label="description" 
            variant="outlined" 
            defaultValue={router.query.description}
            className={classes.textField}
            inputRef={inputRef} 
            error={inputError}
            inputProps={{ required: true, maxLength: 255 }}
            helperText={inputRef?.current?.validationMessage}
            onChange={e => handleChange(e)}
          />
          <br/>
          <TextField 
            id="publisher" 
            label="publisher" 
            variant="outlined" 
            defaultValue={router.query.publisher}
            className={classes.textField}
            inputRef={inputRef} 
            error={inputError}
            inputProps={{ required: true, maxLength: 50 }}
            helperText={inputRef?.current?.validationMessage}
            onChange={e => handleChange(e)}
          />
          <br/>
          <TextField 
            id="publisheddate" 
            label="publisheddate" 
            variant="outlined" 
            type="date"
            defaultValue={router.query.publisheddate}
            className={classes.textField}
            inputRef={inputRef} 
            error={inputError}
            inputProps={{ required: true }}
            InputLabelProps={{
                shrink: true,
                }}
            helperText={inputRef?.current?.validationMessage}
            onChange={e => handleChange(e)}
          />

          <br/><br/>
          <Button type="submit" className={classes.customButton} variant="contained" color="secondary">Edit</Button>
          <Link href="/">
            <Button type="button" className={classes.customButton} variant="contained" color="default">Back to Home</Button>
          </Link>
        </form>
    </div>
  );
};

export default BookEditer;