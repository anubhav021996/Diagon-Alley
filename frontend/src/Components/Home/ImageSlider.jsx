import { Image } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

export const ImageSlider = () => {
  const images = [
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012148/Manuals/harrypottershop-gallery-staff_qi4qq7.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012142/Manuals/7_luwhwz.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012142/Manuals/aaa_qyld4b.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012142/Manuals/Large_Platform2_1024x_rjqbto.webp",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012142/Manuals/harrypottershop-gallery-gryffindor_ou5qaa.jpg",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012142/Manuals/Kowalski_Quality_Baked_Goods_in_1932_vmwqqi.webp",
    "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012142/Manuals/harrypottershop-gallery-interior_y6nsbh.jpg"
  ];
  return (
      <Carousel>
        {images.map((item) => (
          <Carousel.Item key={item} interval={3000}>
            <Image className="d-block w-100" src={item} maxH={"500"} alt="Slide image"/>
          </Carousel.Item>
        ))}
      </Carousel>
  );
};