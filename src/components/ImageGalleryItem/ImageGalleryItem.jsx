import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, largeImageURL, tags, openModal }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={url}
        alt={tags}
        onClick={() => openModal(largeImageURL, tags)}
      />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
