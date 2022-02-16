import React from 'react'

type Props = {
    amount: number;
}

const PriceFormat: React.FC<Props> = ({
    amount
}) => {
  return <>
    {new Intl.NumberFormat('hr-HR', { minimumFractionDigits: 2 }).format(amount)}
  </>
}

export default PriceFormat;