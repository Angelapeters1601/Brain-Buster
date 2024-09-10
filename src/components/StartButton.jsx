import { LuBrainCircuit } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";

function Button({ dispatch }) {
  return (
    <div className="start-btn-wrapper">
      <LuBrainCircuit className="brain-icon brain-icon-top" />
      <button
        className="btn"
        onClick={() => dispatch({ type: "OpenSelector" })}
      >
        <p> Let's Begin </p>
        <IoMdArrowDropright />
      </button>
      <LuBrainCircuit className="brain-icon brain-icon-bottom" />
    </div>
  );
}

export default Button;
