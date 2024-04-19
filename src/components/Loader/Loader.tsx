import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={css.loader}>
      <Circles
        height="30"
        width="30"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
