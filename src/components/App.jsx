import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { getImages, pictureValues } from '../services/images-api';
class App extends Component {
  state = {
    images: [],
    search: "",
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: "",
    tags: "",
    error: null,
    totalPages: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    const {search, page} = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.renderGallery();
    }
  }

  async renderGallery() {
    try {
      this.setState({isLoading: true});
      const { search, page } = this.state;
      const { hits, totalHits } = await getImages(search, page);
      const pictures = pictureValues(hits);
      if (pictures.length === 0) {
        toast.warn("We can't find any images");
      }
      if (page === 1) {
        this.setState({ totalPages: Math.ceil(totalHits / 12) });
      }
      this.setState(({images}) => ({
        images: [...images, ...pictures],
      }));
    }
    catch (error) {
      this.setState({ error: error.message });
      toast.error('Ooooooops. Something must have gone wrong. Try again later.')
    }
    finally {
      this.setState({isLoading: false})
    }
  }

  searchImages = search => {
    this.setState({ search, images: [], page: 1 });
  }

  onLoadMore = () => {
    this.setState(prevState=> ({
      page: prevState.page + 1,
    }))
  }

  openModal = (largeImageURL, tags) => {
    this.setState({
      largeImageURL,
      tags,
    });
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }))
  }

  render () {
    const { searchImages, openModal, toggleModal, onLoadMore } = this;
    const { images, largeImageURL, isLoading, showModal, tags } = this.state;

    const canLoadMore = images.length > 0 && this.state.page !== this.state.totalPages

    return (
      <Container>
        <Searchbar onSubmit={searchImages}/>
        <ImageGallery images={images} onOpenModal={openModal} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {isLoading && <Loader />}
        {canLoadMore && <Button text='Load more' onClick={onLoadMore} />}
        {showModal && (
          <Modal
            largeImage={largeImageURL}
            alt={tags}
            onModalClick={toggleModal}
          />
        )}
      </Container>
    )
  }
}

export default App;
