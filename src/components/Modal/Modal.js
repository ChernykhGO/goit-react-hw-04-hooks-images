import s from "./Modal.module.css";

export default function Modal({ largeImageURL, tags, onClick }) {
  return (
    <div className={s.Overlay} onClick={onClick}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}
