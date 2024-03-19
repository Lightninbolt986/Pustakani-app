import React from "react";
import "./ProfilePage.css";
import { useState } from "react";
import "./ProfilePage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import app from "../firestore";
import secureLocalStorage from "react-secure-storage";
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
]; //TODO: add subjects
function ProfilePage({ user, onLogout, setUser }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addBook = (e) => {
    e.preventDefault();
    const bookName = document.getElementById("bookName").value;
    const bookClass = document.getElementById("ClassSelect").value;
    const bookSubject = document.getElementById("SubjectSelect").value;
    user.books = [
      ...user.books,
      { title: bookName, class: bookClass, subject: bookSubject },
    ];
    const db = getFirestore(app);
    const docRef = doc(db, "users", secureLocalStorage.getItem("userToken"));
    updateDoc(docRef, user);
    setUser(user);
    closeModal();
  };
  return (
    <div className="profile-page-box">
      <h1>Guten tag, {user.name}</h1>
      <div className="user-info">
        <img src={user.picture} alt="Profile" />
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="user-books">
        <h2>Books:</h2>
        <button onClick={openModal}>+</button>
        {showModal && (
          <div className="modal">
            <h2>Add a new book</h2>

            <Modal show={showModal} onHide={closeModal} centered autoFocus>
              <form onSubmit={addBook}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <label htmlFor="bookName">Book name/Author:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter book name"
                    id="bookName"
                    required
                  />
                  <label htmlFor="ClassSelect">Class:</label>
                  <select className="form-control" id="ClassSelect">
                    {[...Array(12)].map((e, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="SubjectSelect">Subject:</label>
                  <select className="form-control" id="SubjectSelect">
                    {subjects.map((e, i) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                  <Button className="btn btn-primary" type="submit">
                    Submit form
                  </Button>
                </Modal.Footer>{" "}
              </form>
            </Modal>
          </div>
        )}
        <ul>
          {user.books && user.books.length > 0 ? (
            user.books.map((book, index) => <li key={index}>{book.title}</li>)
          ) : (
            <li>No books found</li>
          )}
        </ul>
      </div>
      <button onClick={onLogout} className="profile-page-logout-button">
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
