import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.props.onModalClick();
    }
  }

  render () {
    const { largeImage, tags } = this.props;
    const { closeModal } = this;

    return (
      createPortal (
        <div className={s.Overlay} onClick={closeModal}>
          <div>
            <img src={largeImage} alt={tags} className={s.Modal}/>
          </div>
        </div>, modalRoot
      )
    )
  }
}


Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onModalClick: PropTypes.func.isRequired,
};

export default Modal;
