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
  
const data: BookRegist = {
    title: '',
    description: '',
    publisher: '',
    publisheddate: null,
    image: '',
};

const BookRegister = () => {
  const classes = useStyles();
  
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
  
  const registBook = async (formData) => {
    const url = `https://localhost:44368/api/BookItems`;

    const {
        data
     } = await axios.post(url, formData);
  
    console.log(data);

    return data;
  };


  return (
      <div className={classes.root}>
        <Head>
          <title>Book Regist</title>
        </Head>
        <h1>Book Regist</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const book: Book = await registBook(formData);
            alert('登録しました。　ID:' + book.id);
          }}
        >
          <TextField 
            id="title" 
            label="title" 
            variant="outlined" 
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
          <Button type="submit" className={classes.customButton} variant="contained" color="secondary">Regist</Button>
          <Link href="/">
            <Button type="button" className={classes.customButton} variant="contained" color="default">Back to Home</Button>
          </Link>
        </form>
    </div>
  );
};

export default BookRegister;