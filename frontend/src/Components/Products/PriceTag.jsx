import { HStack, Text } from '@chakra-ui/react'

const formatPrice= (value,currency) => {
const locale = 'en-US';
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2,
  })
  return formatter.format(value)
}

export const PriceTag = (props) => {
  const { price, currency } = props
  return (
    <HStack spacing="1">
      <Price>
        {formatPrice(price, currency )}
      </Price>
    </HStack>
  )
}

const Price = ({children}) => {
  return (
    <Text
      as="span"
      fontWeight="medium"
    >
      {children}
    </Text>
  )
}