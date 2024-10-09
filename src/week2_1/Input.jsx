import styles from "./style.module.css"
const Input = ({ value, onChange, onSubmit, onClick }) => {
  return (
    <form className={styles.flex} onSubmit={onSubmit} >
      <input className={styles.inputField} type="text" value={value} onChange={onChange} />
      <button onClick={onClick} type="submit">
        할 일 등록
      </button>
    </form>
  );
};

export default Input;
