import React from "react";
import "./ProfilePage.css";
import { useState } from "react";
import "./ProfilePage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
function ProfilePage({ user, onLogout }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addBook = () => {};
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
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <p>Book name:</p>
                  <input type="text" placeholder="Enter book name" required />
                  <p>Class:</p>
                  <select>
                    {[...Array(12)].map((e, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <p>Subject:</p>
                  <select>
                    {subjects.map((e, i) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={addBook()}>
                  Add
                </Button>
              </Modal.Footer>
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
