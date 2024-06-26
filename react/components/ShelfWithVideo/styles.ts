import styled from 'styled-components'

export const Container = styled.div`
  header {
    width: 100%;
    padding: 2px;

    .title {
      margin: 0;
    }
  }

  .shelfAndVideo {
    display: flex;

    .videoConainer {
      width: 40%;

      video,
      iframe {
        width: 100%;
        aspect-ratio: 16/9;
      }
    }

    .shelfContainer {
      width: 60%;

      .vtex-slider-layout-0-x-sliderLayoutContainer {
        margin-bottom: 0;
      }
    }
  }
`
