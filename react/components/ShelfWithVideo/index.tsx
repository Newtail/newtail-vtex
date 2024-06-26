/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import productsByIdentifier from '../../queries/productsByIdentifier.gql'
import { useNewtailMedia } from '../../hooks/useNewtailMedia'
import SuggestedProductsWithVideo from './SuggestedProductsWithVideo'
import * as S from './styles'

const debug = false

interface Props {
  title?: string
}

function ShelfWithVideo({ title }: Props) {
  const { loading, skuProducts, handleEvents } = useNewtailMedia()

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

    const executeQuery = (variables: {
      field: string
      values: string[] | null
    }) =>
      queryBaseProductsCalled
        ? baseProductsRefetch(variables)
        : queryBaseProductsByID({ variables })

    executeQuery({
      field: 'sku',
      values: skuProducts,
    })
  }, [
    queryBaseProductsCalled,
    queryBaseProductsByID,
    baseProductsRefetch,
    skuProducts,
  ])

  const handleClick = useCallback(
    (data: Product) => {
      const itemId = data.items?.[0]?.itemId

      handleEvents({ type: 'product', event: 'click', itemId })
    },
    [handleEvents]
  )

  // fake move
  const { query: queryRaw } = useRuntime()

  const moveElement = useMemo(
    () => queryRaw?.move_element === 'true',
    [queryRaw]
  )

  return (
    <>
      {!!skuProducts && !!skuProducts?.length && (
        <S.Container
          id="newtail-media-shelf"
          className="newtail-media-shelf"
          style={
            moveElement
              ? {
                  paddingLeft: '8px 0',
                  margin: '8px 8px 8px 50px',
                  border: 'solid #eee',
                  borderWidth: '1px 0',
                }
              : {}
          }
        >
          <header>
            <h3 className="title">Festival de cervejas</h3>
          </header>
          <div className="shelfAndVideo">
            <div className="videoConainer">
              <video
                muted
                playsInline
                controls
                autoPlay
                loop
                poster="https://motionarray.imgix.net/motion-array-1281345-A037_C009_0713CE_V1-0004-high_0001.jpg?w=660&amp;q=60&amp;fit=max&amp;auto=format"
              >
                <source
                  src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1281345-A037_C009_0713CE_V1-0004-high.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1281345-A037_C009_0713CE_V1-0004-high.webm"
                  type="video/webm"
                />
                <source
                  src="https://motionarray.com/assets/images/site/thumb_placeholder.png"
                  type="video/ogg"
                />
              </video>

              {/* <iframe
                src="https://www.youtube.com/embed/0AvTQmANru4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              /> */}
            </div>

            <div className="shelfContainer">
              {!loadingBaseProducts && skuProducts && baseProductsData && (
                <>
                  <SuggestedProductsWithVideo
                    title={title}
                    products={baseProductsData.productsByIdentifier}
                    onProductClick={handleClick}
                  />
                </>
              )}
            </div>
          </div>
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

export default ShelfWithVideo
