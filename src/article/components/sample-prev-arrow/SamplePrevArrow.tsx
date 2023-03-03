import { CustomArrowProps } from "react-slick";
import styles from "./SamplePrevArrow.module.scss";
import { ArrowLeft } from "phosphor-react";

const SamplePrevArrow = (props: CustomArrowProps) => {
  const { onClick, className, style } = props;
  return (
    <button
      onClick={onClick}
      className={`${styles.arrow} ${className}`}
      style={style}
    >
      <ArrowLeft />
    </button>
  );
};

export default SamplePrevArrow;
