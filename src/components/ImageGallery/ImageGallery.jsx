import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({images, onOpenModal}) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeImageURL={largeImageURL}
            openModal={onOpenModal}
            tags={tags}
          />
        )
      }
      )}
    </ul>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
