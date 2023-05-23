import { ImageType } from "@/src/types/image";
import Image from "next/image";
import Slider from "react-slick";
import SampleNextArrow from "../sample-next-arrow/SampleNextArrow";
import SamplePrevArrow from "../sample-prev-arrow/SamplePrevArrow";
import styles from "./ArticleSlider.module.scss";

type Props = {
  images?: ImageType[];
};

const ArticleSlider = ({ images }: Props) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  const renderImages = () => {
    if (images && images.length > 0) {
      return images.map((image: ImageType) => {
        return (
          <div key={image.key} className={styles.imgWrapper}>
            <Image src={image.Location} fill alt="" />
          </div>
        );
      });
    }
  };

  return (
    <>
      {images && images.length > 0 ? (
        <Slider {...settings} className={styles.slider}>
          {renderImages()}
        </Slider>
      ) : (
        <div className={styles.noImage}>
          <p>Aucune image n'a été renseignée pour cet article</p>
        </div>
      )}
    </>
  );
};

export default ArticleSlider;
