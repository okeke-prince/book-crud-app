"use client"

import { useState } from "react";

interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
}
export default function Home() {


  const [books, setBooks] = useState<Book[]>([
    { title: "The Time Thief", author: "James Hunter", year: 2021, genre: "Science Fiction" },
    { title: "Silent Shadows", author: "Anna Williams", year: 2020, genre: "Thriller" },
    { title: "Digital Eden", author: "Michael Chan", year: 2019, genre: "Cyberpunk" }
  ]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const isShown = true

  function onDelete( title: string){
      setBooks((val) =>{
        return val.filter(book => book.title !== title)
      })
      
  }

  function onAddBook(e: React.FormEvent){
    e.preventDefault();
    if (!title || !author || !year || !genre) return;
    const newBook: Book = {
      title: title,
      author: author,
      year: parseInt(year),
      genre: genre
    }
    setBooks(prev =>
      prev.some(b => b.title === title)
        ? prev.map(b => b.title === title ? newBook : b) : [...prev, newBook]
    )
    /* setBooks([...books, newBook]) */
  }
  

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <h2 className="py-5">Available Books</h2>
        <form id="bookForm" className=" border p-2 grid  grid-cols-1 gap-2" onSubmit={(a) => { onAddBook(a) }}>
          <div className="grid grid-cols-4 gap-2">
            <input type="text" id="title" placeholder="Title" required className=" p-3 bg-gray-100" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" id="author" placeholder="Author" required className=" p-3 bg-gray-100" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <input type="number" id="year" placeholder="Year" required className=" p-3 bg-gray-100" value={year} onChange={(e) => setYear(e.target.value)} />
            <input type="text" id="genre" placeholder="Genre" required className=" p-3 bg-gray-100" value={genre} onChange={(e) => setGenre(e.target.value)}/>
          </div>

          <div>
            <button type="submit" className="p-2 bg-blue-500 text-white font-medium rounded-[0.5rem]">Update Book</button>
            <button type="submit" className="p-2 bg-blue-500 text-white font-medium rounded-[0.5rem] mx-4">Add book</button>
          </div>
        </form>
        <div className="mt-4">
          {
            isShown && (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Author</th>
                    <th className="border px-4 py-2">Year</th>
                    <th className="border px-4 py-2">Genre</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    books.map((book, index) => {
                      return (
                        <tr key={index} className="border">
                  
                          <td className="py-2 px-4 flex justify-between items-center gap-4">
                            <button className="p-2 bg-red-500 text-white font-medium rounded-md" onClick={() => onDelete(book.title)}>
                              Delete
                            </button>
                            <span>{book.title}</span>
                          </td>
                          <td className="border px-4 py-2 text-center">{book.author}</td>
                          <td className="border px-4 py-2 text-center">{book.year}</td>
                          <td className="border px-4 py-2 text-center">{book.genre}</td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            )
          }

        </div>
      </div>
    </div>
  );
}
