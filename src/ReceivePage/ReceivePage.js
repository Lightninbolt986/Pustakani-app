import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../firestore";
import BookBox from "./bookBox";
import "./ReceivePage.css";

const subjects = [
  "Mathematics",
  "Science",
  "Social Science",
  "Physics",
  "Accountancy",
  "Sanskrit",
  "Hindi",
  "English",
  "Biology",
  "History",
  "Geography",
  "Psychology",
  "Sociology",
  "Chemistry",
  "Political Science",
  "Economics",
  "Business Studies",
  "Home Science",
  "Urdu",
  "Fine Art",
  "Computer Science",
];

function ReceivePage() {
  let [books, setBooks] = useState([false]);
  const searchBooks = (e) => {
    e.preventDefault();
    const classSelect = document.getElementById("ClassSelect").value;
    const subjectSelect = document.getElementById("SubjectSelect").value;
    const db = getFirestore(app);
    getDocs(collection(db, "users")).then((booksRef) => {
      booksRef = booksRef.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      books = [];
      setBooks(books);
      for (let i = 0; i < booksRef.length; i++) {
        const bok = booksRef[i].books;
        for (let j = 0; j < bok.length; j++) {
          const element2 = bok[j];
          if (
            element2.class === classSelect &&
            element2.subject === subjectSelect
          ) {
            books = [
              ...books,
              {
                book: element2,
                id: booksRef[i].id,
                phone: booksRef[i].phone,
                address: booksRef[i].address,
              },
            ];
          }
        }
      }
      setBooks(books);
    });
  };
  return (
    <div className="receive-page-container">
      <div>
        <form onSubmit={searchBooks}>
          <label htmlFor="ClassSelect">Class: </label>
          {"     "}
          <select className="form-control" id="ClassSelect">
            {[...Array(12)].map((e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="SubjectSelect">Subject:</label>{" "}
          <select className="form-control" id="SubjectSelect">
            {subjects.map((e, i) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>{" "}
          <br />
          <br />
          <Button className="btn btn-primary" type="submit">
            Submit form
          </Button>
        </form>
      </div>
      <div class="book-boxes-container">
        {" "}
        {books.length > 0 ? (
          books[0] ? (
            books.map((element) => {
              return <BookBox {...element} />;
            })
          ) : (
            false
          )
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}

export default ReceivePage;
