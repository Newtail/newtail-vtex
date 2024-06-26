/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'

import productsByIdentifier from '../../queries/productsByIdentifier.gql'
import { useNewtailMedia } from '../../hooks/useNewtailMedia'
import SuggestedProducts from './SuggestedProducts'
import * as S from './styles'

const debug = false

interface Props {
  title?: string
}

function Shelf({ title }: Props) {
  const { loading, skuProducts } = useNewtailMedia()

  const [
    queryBaseProductsByID,
    {
      data: baseProductsData,
      loading: loadingBaseProducts,
      called: queryBaseProductsCalled,
      refetch: baseProductsRefetch,
    },
  ] = useLazyQuery(productsByIdentifier, { notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (!!skuProducts && skuProducts.length === 0) {
      return
    }

    const executeQuery = (variables: Record<string, any>) =>
      queryBaseProductsCalled
        ? baseProductsRefetch(variables)
        : queryBaseProductsByID({ variables })

    if (skuProducts) {
      executeQuery({
        field: 'sku',
        values: skuProducts,
      })
    }
  }, [
    queryBaseProductsCalled,
    queryBaseProductsByID,
    baseProductsRefetch,
    skuProducts,
  ])

  return (
    <>
      {!!skuProducts && !!skuProducts?.length && (
        <S.Container id="newtail-media-shelf" className="newtail-media-shelf">
          {!loadingBaseProducts && skuProducts && baseProductsData && (
            <>
              <SuggestedProducts
                title={title}
                products={baseProductsData.productsByIdentifier}
              />
            </>
          )}
        </S.Container>
      )}

      {debug && (
        <>
          {loading && (
            <small>
              <code>Carregando ads</code>
            </small>
          )}
          {loadingBaseProducts && (
            <small>
              <code>Carregando ofertas VTEX</code>
            </small>
          )}
        </>
      )}
    </>
  )
}

export default Shelf
