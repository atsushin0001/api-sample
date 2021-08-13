import { StringDecoder } from "string_decoder";

type Book = {
  id?: string
  title: string
  description: string
  publisher: string
  publisheddate: Date
  image: string
}

export default Book;