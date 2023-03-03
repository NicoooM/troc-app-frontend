import { CustomArrowProps } from "react-slick";
import styles from "./SampleNextArrow.module.scss";
import { ArrowRight } from "phosphor-react";

const SampleNextArrow = (props: CustomArrowProps) => {
  const { onClick, className, style } = props;
  return (
    <button
      onClick={onClick}
      className={`${styles.arrow} ${className}`}
      style={style}
    >
      <ArrowRight />
    </button>
  );
};

export default SampleNextArrow;
