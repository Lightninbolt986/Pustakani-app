import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const BookBox = ({ book, id, phone, address }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="book-box-container">
      <div className="book-box">
        <h3>{book.title}</h3>
        <p>Class: {book.class}</p>
        <p>Subject: {book.subject}</p>
        <button className="btn btn-primary" onClick={handleShow}>
          View
        </button>
      </div>

      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{book.title}</h3>
            <p>Class: {book.class}</p>
            <p>Subject: {book.subject}</p>
            <p>Donor phone number: {phone}</p>
            <p>
              Address:{" "}
              {` ${address.address}, ${address.district}, ${address.state}`}
            </p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default BookBox;
