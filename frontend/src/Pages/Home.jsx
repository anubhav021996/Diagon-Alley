import { ImageSlider } from "../Components/Home/ImageSlider"
import { Newsletter } from "../Components/Home/Newsletter"
import { TopStores } from "../Components/Home/TopStores"
import { TrendingProducts } from "../Components/Home/TrendingProducts"
import { Wand } from "../Components/Home/Wand"

export const Home= () => {
    return(
        <>
            <ImageSlider />
            <TrendingProducts />
            <Wand />
            <TopStores />
            <Newsletter />
        </>
    )
}