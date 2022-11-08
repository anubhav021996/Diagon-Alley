import { Button, HStack } from "@chakra-ui/react";

function createArrayOfSize(n) {
    return new Array(n).fill(0);
  }
  
  export const Pagination= ({handlePageChange,currentPage,totalPages}) => {
    let arr= createArrayOfSize(totalPages);
    let pages = arr.map((a, i) => <Button onClick={()=>handlePageChange(i+1)} disabled={i+1==currentPage} key={i}>{i+1}</Button>);
    return <HStack>{pages}</HStack>;
  }