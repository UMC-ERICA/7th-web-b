const Button = ({ onClick, children, type = 'button' }) => {
    return (
        <button onClick={onClick} type={type} className="btn">
            {children}
        </button>
    );
};

export default Button;
