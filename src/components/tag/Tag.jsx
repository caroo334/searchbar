import "./Tag.css";

export const Tag = ({ tag, onClick }) => (
  <div className="home-search-tag">
    <span>{tag}</span>
    <button onClick={onClick} className="home-delete-button">
      x
    </button>
  </div>
);
