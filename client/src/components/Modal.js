import React from "react";

const Modal = ({ showModal, form }) => {
  return <div>{showModal ? form : null}</div>;
};

export default Modal;
