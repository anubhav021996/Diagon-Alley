import {Popover, PopoverTrigger, PopoverContent, Box, Link} from "@chakra-ui/react";
import { Subcat } from './Subcat';

export const PopOver= ({item,trigger}) => {
    return(
        <Box>
            <Popover trigger={trigger} placement={'bottom-start'}>
                <PopoverTrigger>
                    <Link
                      p={2}
                      fontWeight={500}
                      _hover={{
                        textDecoration: 'none',
                      }}
                      >
                      {item}
                    </Link>
                </PopoverTrigger>
                 <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    p={4}
                    rounded={'xl'}
                    minW={'sm'}>
                    <Subcat />
                </PopoverContent>
            </Popover>
        </Box>
    )
}