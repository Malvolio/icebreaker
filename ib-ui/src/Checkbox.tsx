import { FC } from "react";
import "./Checkbox.css";
const Checkbox: FC<{ checked: boolean }> = ({ checked }) => (
  <svg className="checkbox" x="0px" y="0px" viewBox="0 0 135 110" height="100%">
    <rect
      className="box"
      x="5"
      y="5"
      width="100"
      height="100"
      transform="rotate(90 55 55)"
    />
    {checked ? <path className="check" d="M126.8,14L55.7,70L29.2,50" /> : null}
  </svg>
);

export default Checkbox;
