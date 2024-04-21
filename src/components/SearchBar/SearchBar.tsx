import { FormEvent } from "react";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
  onSetSearchQuery: (query: string) => void;
}

const SearchBar = ({ onSetSearchQuery }: SearchBarProps) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const notification = () => toast.error("Enter a search word.");

    const inputValue = (
      form.elements.namedItem("inputValue") as HTMLInputElement
    ).value.trim();
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
