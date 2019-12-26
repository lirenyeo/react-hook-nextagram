import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import Image from '../components/GracefulImage'

import { GET_USER_IMAGES } from '../constants/api'
import LoadingIndicator from '../components/LoadingIndicator'

const UserImagesContainer = styled.section`
  background: lightgray;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  img {
    height: 150px;
  }
`

const UserImages = ({ userId }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios.get(GET_USER_IMAGES(userId)).then(result => {
      setImages(result.data)
      setLoading(false)
    })
  }, [userId])

  return (
    <UserImagesContainer>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {images.map(img => (
            <Image src={img.url} />
          ))}
        </>
      )}
    </UserImagesContainer>
  )
}

export default UserImages
