import React, { useState } from 'react'
import styled from 'styled-components'

import { Form, FormGroup, FormText, Button, Input, Container } from 'reactstrap'
import Axios from 'axios'
import { toast } from 'react-toastify'

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  flex-direction: column;
`

const PreviewContainer = styled.div`
  margin-top: 20px;

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  p {
    animation: blink 1s infinite;
  }
`

const PreviewImg = styled.img`
  display: block;
  margin: 15px auto;
  width: 70%;
  border-radius: 15px;

  ${props => props.loading && `animation: blink 1s infinite;`}
  ${props => props.loading && `filter: grayscale(1);`}

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = e => {
    e.preventDefault()
    setLoading(true)

    let formData = new FormData()
    formData.append('image', imageFile)

    Axios.post('https://insta.nextacademy.com/api/v1/images/', formData, {
      headers: { Authorization: `Bearer ${localStorage.jwt}` }
    })
      .then(response => {
        console.log(response)
        if (response.data.success) {
          setPreviewImage(null)
          setImageFile(null)
          setLoading(false)
          toast('Image is successfully uploaded')
        }
      })
      .catch(error => {
        console.log(error.response)
        setLoading(false)
      })
  }
  const handleFileInput = e => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0])
  }

  return (
    <StyledContainer>
      <Form onSubmit={handleUpload}>
        <FormGroup>
          <Input
            type="file"
            name="image-file"
            onChange={handleFileInput}
            multiple={false}
          />
          <FormText color="muted">
            Make sure the image being uploaded is a supported format.
          </FormText>
        </FormGroup>
        <Button type="submit" color="info" disabled={!imageFile || loading}>
          {imageFile ? 'Looks good! Click here to upload!' : 'Select an Image'}
        </Button>
      </Form>
      <PreviewContainer>
        {previewImage && <PreviewImg src={previewImage} loading={loading} />}
        {loading && <p className="text-muted text-center">Uploading...</p>}
      </PreviewContainer>
    </StyledContainer>
  )
}

export default UploadPage
