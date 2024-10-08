const Input = ({ value, onChange, defaultValue, placeholder }) => {
    return (
        <input 
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="input"
        />
    );
};

export default Input;
