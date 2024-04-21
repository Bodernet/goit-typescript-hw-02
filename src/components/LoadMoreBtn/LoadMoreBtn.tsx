import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProp {
  onLoadMore: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const LoadMoreBtn: React.FC<LoadMoreBtnProp> = ({ onLoadMore }) => {
  return (
    <button className={css.loadMorebutton} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
