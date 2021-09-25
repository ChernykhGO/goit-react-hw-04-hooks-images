import s from "./Button.module.css";

export default function Button({ handleLoadMore }) {
  return (
    <button className={s.Button} onClick={handleLoadMore}>
      Load more
    </button>
  );
}
