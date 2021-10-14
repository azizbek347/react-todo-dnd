import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { v4 as uuid } from "uuid";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.item.title,
      description: this.props.item.text,
      formErrors: { title: props.edit ? true : false, description: props.edit ? true : false },
      titleValid: props.edit ? true : false,
      descriptionValid: props.edit ? true : false,
      formValid: props.edit ? true : false,
    };
    this.titleInput = createRef();
    this.textareaInput = createRef();
  }

  saveHandler = () => {
    const { action, item, toggleModal } = this.props;
    const {
      titleInput: { current: titleInput },
      textareaInput: { current: textareaInput },
    } = this;
    if (!item.type && !item.id) {
      item.id = uuid();
      item.type = "to do";
    }
    item.title = titleInput.value;
    item.text = textareaInput.value;
    action("edit", item);
    toggleModal();
  };

  handleUserInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({ [id]: value }, () => {
      this.validateField(id, value);
    });
  };

  validateField(fieldID, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let descriptionValid = this.state.descriptionValid;
    switch (fieldID) {
      case "title":
        titleValid = value.trim().length >= 0;
        fieldValidationErrors.title = titleValid ? true : false;
        break;
      case "description":
        descriptionValid = value.trim().length >= 0;
        fieldValidationErrors.description = descriptionValid ? true : false;
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        titleValid: titleValid,
        descriptionValid: descriptionValid,
      },
      this.validateForm
    );
    console.log(fieldValidationErrors, this.state.formValid);
  }

  validateForm() {
    this.setState({
      formValid: this.state.titleValid && this.state.descriptionValid,
    });
  }

  errorClass(error) {
    return error ? "is-valid" : "is-invalid";
  }

  render() {
    const { edit, toggleModal, item } = this.props;
    const {
      titleInput,
      textareaInput,
      handleUserInput,
      saveHandler,
      errorClass,
    } = this;
    const { formValid, formErrors } = this.state;
    const markup = (
      <div className="modal-overlay">
        <div className="modal-content" tabIndex="-1" autoFocus>
          <div className="d-flex justify-content-between p-2">
            <span>{edit ? "Edit Item" : "Add Item"}</span>
            <button className="close-btn" onClick={() => toggleModal()}>
              <span>&#215;</span>
            </button>
          </div>
          <form action="#" className="pb-2">
            <div className="form-group px-2 pt-2 mb-2 border-top">
              <label htmlFor="title" className="mb-2">
                <span className="text-danger">* </span>
                Title
              </label>
              <input
                type="text"
                className={`form-control ${errorClass(formErrors.title)}`}
                id="title"
                aria-describedby="title"
                autoComplete="off"
                ref={titleInput}
                defaultValue={item.title}
                onChange={handleUserInput}
                placeholder="Title"
              />
            </div>
            <div className="form-group px-2 pb-2 mb-2 border-bottom">
              <label htmlFor="description" className="mb-2">
                <span className="text-danger">* </span>
                Description
              </label>
              <textarea
                className={`form-control ${errorClass(formErrors.description)}`}
                id="description"
                rows="3"
                ref={textareaInput}
                defaultValue={item.text}
                onChange={handleUserInput}
                placeholder="Description"
              ></textarea>
            </div>
            <div
              className="d-flex justify-content-end px-2"
              role="group"
              aria-label="Buttons"
            >
              <button
                type="button"
                className="btn border btn-light p-1 px-2"
                onClick={() => toggleModal()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary p-1 px-2 ml-2"
                onClick={() => saveHandler()}
                disabled={formValid ? false : true}
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    );
    return ReactDOM.createPortal(
      markup,
      document.getElementById("modalContainer")
    );
  }
}

export default Modal;
