import { HiUserAdd } from "react-icons/hi";
const AddButton = ({ handleClick }) => {
  return (
    <button className="add-btn" onClick={() => handleClick()}>
      <HiUserAdd style={{ fontSize: "1.2rem", marginRight: "0.3rem" }} /> Add
    </button>
  );
};

// const Fun = () => {
//   return(
//     <
//   )

// }
export default AddButton;
