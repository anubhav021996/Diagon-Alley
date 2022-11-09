import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { TopStoreCard } from "./TopStoreCard";

const stores= [{name: "Ollivander's Wands", img:"https://res.cloudinary.com/dyocvbqbf/image/upload/v1667867243/n19cnmbod8i1fnnxlakt.webp", msg:"Unique interactive wands made from choices like holly, reed, birch, willow, ash, vine, hazel, ivy, rowan, hawthorne and alder.", banner: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667925055/Manuals/ollivanders_copy_llgpps.jpg"},
{name: "Sweet Trolley", img: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667924375/itwdb0sxqcxf8qib7knk.webp", msg: " Delicious range of sweets including Chocolate Frogs, Bertie Bott's and a range of Hogwarts chocolate favourites available exclusively from the Sweet Trolley.", banner: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667925046/Manuals/855edda8-bbf4-45e9-bb6f-116e24c1bc5f-resize-950x633_dfnxdm.webp"}]

export const TopStores= () => {
    return(
        <VStack m={10} p={5} boxShadow= "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
        <Heading>Top Stores</Heading>
        <SimpleGrid columns={{base:1, lg:2}} gap={20} pt={5} >
            {stores.map((e)=><TopStoreCard key={e.name} item={e} />)}
        </SimpleGrid>
        </VStack>
    )
}