import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import styled from "styled-components";
import { IMAGE_COUNT } from "@/config";


const PhotoGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;

  li {
    height: 200px;
    flex-grow: 1;
    margin: 4px;
  }

  img {
    max-height: 100%;
    
    min-width: 100%;
    /* max-width: 150%; */
    
    object-fit: cover;
    /* object-position: center 20%; */
    vertical-align: bottom;
    /* justfy-content: center; */
  }
`;


const PhotoSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  img {
    max-height: 100%;
    max-width: 100%;
  }
`


const MyGallery = () => {

  const options = {
    bgOpacity: 0.8,
  }

  return <PhotoGrid>
    <Gallery options={options}>
      {Array.from(Array(IMAGE_COUNT), (_, i) => i + 1).map((i) => (
          <li>
            <Item
              key={i}
              original={`/photos/gallery/${i}.jpg`}
              thumbnail={`/photos/gallery/${i}.jpg`}
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
                  ref={ref}
                  role="button"
                  onClick={open}
                  src={`/photos/gallery/${i}.jpg`}
                  loading="lazy"
                  alt=""
                />
              )}
            </Item>
          </li>
        )
      )}
    </Gallery>
  </PhotoGrid>
}

export default MyGallery