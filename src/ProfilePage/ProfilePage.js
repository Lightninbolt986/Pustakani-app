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
        const docRef = doc(
            db,
            "users",
            secureLocalStorage.getItem("userToken")
        );
        updateDoc(docRef, user);
        setUser(user);
        closeModal();
    };
    const deleteBook = (e) => {
        const index = Number(e.currentTarget.dataset.number);
        let updatedBooks = user.books.filter((book, i) => i !== index);
        const db = getFirestore(app);
        const docRef = doc(
            db,
            "users",
            secureLocalStorage.getItem("userToken")
        );
        updateDoc(docRef, { ...user, books: updatedBooks });
        setUser({ ...user, books: updatedBooks });
    };
    return (
        <div className="profile-page-box">
            <h1>Guten tag, {user.name}</h1>
            <button onClick={onLogout} className="profile-page-logout-button">
                Logout
            </button>

            <div className="user-info">
                <img src={user.picture} alt="Profile picture" />
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
            <div className="user-books">
                <h2>Books</h2>
                <button
                    onClick={openModal}
                    className="profile-page-new-books-btn"
                >
                    Add new books
                </button>
                {showModal && (
                    <div className="modal">
                        <h2>Add a new book</h2>

                        <Modal
                            show={showModal}
                            onHide={closeModal}
                            centered
                            autoFocus
                        >
                            <form onSubmit={addBook}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal title</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label htmlFor="bookName">
                                        Book name/Author:
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter book name"
                                        id="bookName"
                                        required
                                    />
                                    <label htmlFor="ClassSelect">Class:</label>
                                    <select
                                        className="form-control"
                                        id="ClassSelect"
                                    >
                                        {[...Array(12)].map((e, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="SubjectSelect">
                                        Subject:
                                    </label>
                                    <select
                                        className="form-control"
                                        id="SubjectSelect"
                                    >
                                        {subjects.map((e, i) => (
                                            <option key={e} value={e}>
                                                {e}
                                            </option>
                                        ))}
                                    </select>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Submit form
                                    </Button>
                                </Modal.Footer>{" "}
                            </form>
                        </Modal>
                    </div>
                )}
                <ol>
                    {user.books && user.books.length > 0 ? (
                        user.books.map((book, index) => {
                            console.log(
                                book.title,
                                book.class,
                                book.subject,
                                index
                            );
                            return (
                                <div className="bookDiv">
                                    <li key={index}>
                                        {book.title}
                                        <br /> {book.subject}
                                        <br /> Grade: {book.class}
                                    </li>

                                    <button
                                        class="bin-btn"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        data-number={index}
                                        onClick={deleteBook}
                                    >
                                        <svg
                                            style={{
                                                width: "1em",
                                                height: "1em",
                                                margin: "auto",
                                            }}
                                            viewBox="0 0 512 512"
                                            version="1.1"
                                        >
                                            <g>
                                                <path
                                                    d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z"
                                                    fill="#37404D"
                                                />
                                                <rect
                                                    fill="#37404D"
                                                    height="317.885"
                                                    width="19.868"
                                                    x="246.173"
                                                    y="126.511"
                                                />
                                                <polygon
                                                    fill="#37404D"
                                                    points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "
                                                />
                                                <polygon
                                                    fill="#37404D"
                                                    points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "
                                                />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <li>No books found</li>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default ProfilePage;
