import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";
const SearchBar = ({ onSetSearchQuery }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const notification = () => toast.error("Enter a search word.");

    const inputValue = form.elements.inputValue.value.trim();
    if (!inputValue) {
      notification();
      return;
    }
    onSetSearchQuery(inputValue);

    form.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          name="inputValue"
          placeholder="Search images and photos"
        />
        <button className={css.searchBtn} type="submit">
          <IoSearchOutline />
        </button>
        <Toaster position="top-center" reverseOrder={false} />
      </form>
    </header>
  );
};

export default SearchBar;
