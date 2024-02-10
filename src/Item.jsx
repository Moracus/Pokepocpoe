import "./Item.css";
export default function Item({ value, onClick }) {
  return (
    <>
      <button className="Item" onClick={onClick}>
        {value && <img src={value} width={80} />}
      </button>
    </>
  );
}
