import Image from "next/image";
import Slider from "react-slick";
import SampleNextArrow from "../sample-next-arrow/SampleNextArrow";
import SamplePrevArrow from "../sample-prev-arrow/SamplePrevArrow";
import styles from "./ArticleSlider.module.scss";

const ArticleSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings} className={styles.slider}>
      <div className={styles.imgWrapper}>
        <Image
          src={
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80"
          }
          fill
          alt=""
        />
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={
            "https://images.unsplash.com/photo-1677583229794-69bedfca219c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
          }
          fill
          alt=""
        />
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={
            "https://images.unsplash.com/photo-1677643515868-d5ee7d304c0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
          }
          fill
          alt=""
        />
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={
            "https://images.unsplash.com/photo-1677533484707-756caeaf46c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
          }
          fill
          alt=""
        />
      </div>
    </Slider>
  );
};

export default ArticleSlider;
