import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import styled from "styled-components";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { IMAGE_COUNT } from "@/config";


const PhotoGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .gallery-wrapper {
    width: 800px;
    max-width: 800px;
    padding: 10px;
    div {
      display: flex;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;


const PhotoSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  img {
    max-height: 100% !important;
    max-width: 100% !important;
  }
`


const MyGallery = () => {

  const options = {
    bgOpacity: 0.8,
    // showHideAnimationType: 'zoom',
    // zoom: false,
    // wheelToZoom: false,
    // clickToCloseNonZoomable: false,
    // doubleTapAction: false,
    // maxZoomLevel: 'fit',
    // secondaryZoomLevel: 'fit',
  }
  return <PhotoGrid>
    <div className={'gallery-wrapper'}>
      <Gallery options={options}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 500: 2, 800: 3 }}>
          <Masonry columnsCount={2} gutter="8px">
            {Array.from(Array(IMAGE_COUNT), (_, i) => i + 1).map((i) => (
                <div key={`li-${i}`}>
                  <Item
                    key={`img-${i}`}
                    // original={`/photos/gallery/${i}.jpg`}
                    // thumbnail={`/photos/gallery/${i}.jpg`}
                    content={
                      <PhotoSlide>
                        <img
                          role="button"
                          src={`/photos/gallery/${i}.jpg`}
                          loading="lazy"
                          alt=""
                        />
                      </PhotoSlide>
                    }
                  >
                    {({ ref, open }) => (
                      <img
                        ref={ref as React.MutableRefObject<HTMLImageElement>}
                        role="button"
                        onClick={open}
                        src={`/photos/thumbnail/${i}.jpg`}
                        loading="lazy"
                        alt=""
                      />
                    )}
                  </Item>
                </div>
              )
            )}
          </Masonry>
        </ResponsiveMasonry>
      </Gallery>
    </div>
  </PhotoGrid>
}

export default MyGallery