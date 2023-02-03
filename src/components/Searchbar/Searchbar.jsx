import {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  }

  handleChange = e => {
   const { name, value } = e.target;
   this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.search.trim());
    this.reset();
  }

  reset() {
    this.setState({ search: '' });
  }


  render(){
  const { search } = this.state;
  const { handleSubmit, handleChange } = this;

    return(
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            name="search"
            value={search}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            required
          />
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
