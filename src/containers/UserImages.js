import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import Image from '../components/GracefulImage'

import { GET_USER_IMAGES } from '../constants/api'
import Skeleton from 'react-loading-skeleton'

const UserImagesContainer = styled.section`
  display: flex;
  flex-flow: row wrap;

  width: 100%;
  padding: 5px 0;

  .brick {
    flex: auto;
    height: 200px;
    min-width: 100px;
    margin: 0 8px 8px 0; /* Some gutter */

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    &:nth-child(4n + 1) {
      width: 250px;
    }

    &:nth-child(4n + 2) {
      width: 325px;
    }
    &:nth-child(4n + 3) {
      width: 180px;
    }
    &:nth-child(4n + 4) {
      width: 380px;
    }
  }
`

const UserImages = ({ userId, center = false }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios.get(GET_USER_IMAGES(userId)).then(result => {
      setImages(result.data)
      setLoading(false)
    })
  }, [userId])

  return (
    <>
      {loading ? (
        <div style={{ padding: '2em 1em' }}>
          <Skeleton height={80} />
        </div>
      ) : (
        <UserImagesContainer center={center}>
          {images.map(img => (
            <div className="brick">
              <Image src={img.url} alt="user uploaded pics" />
            </div>
          ))}
        </UserImagesContainer>
      )}
    </>
  )
}

export default UserImages
