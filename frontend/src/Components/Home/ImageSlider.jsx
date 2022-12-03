import { Image } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

export const ImageSlider = () => {
  const images = [
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668103026/Manuals/aaa_qyld4b_vz2gso.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668103024/Manuals/7_luwhwz_k8c3wr.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668103026/Manuals/Large_Platform2_1024x_rjqbto_bvgz14.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668103030/Manuals/harrypottershop-gallery-gryffindor_ou5qaa_v6aqjf.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668103033/Manuals/harrypottershop-gallery-interior_y6nsbh_new8zg.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668103578/Manuals/Kowalski_Quality_Baked_Goods_in_1932_vmwqqi_fcnlrs.jpg",
  ];
  return (
    <Carousel controls={false} pause={false}>
      {images.map((item) => (
        <Carousel.Item key={item} interval={3000}>
          <Image
          
            className="d-block w-100"
            src={item}
            maxH={400}
            alt="Slide image"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
