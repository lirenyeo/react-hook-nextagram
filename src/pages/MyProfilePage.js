import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import TowPic from '../images/tow.svg'
import Axios from 'axios'

const MyProfilePage = ({ currentUser }) => {
  const [myImages, setMyImages] = useState([])
  useEffect(() => {
    Axios.get('https://insta.nextacademy.com/api/v1/images/me', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    }).then(res => {
      setMyImages(res.data)
    })
  }, [])

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '50px'
      }}
    >
      <img style={{ height: '40vh' }} src={TowPic} alt="under construction" />
      <h3 className="text-muted mt-5">
        Hey {currentUser.user.username}! Sorry, your page is under construction!
      </h3>
      {myImages.length ? (
        <div>
          <p className="text-center mt-5">
            But I think these are your pictures:
          </p>
          {myImages.map((url, idx) => (
            <img
              key={idx}
              src={url}
              className="m-2"
              height="50"
              alt="user uploaded pic"
            />
          ))}
        </div>
      ) : null}
    </Container>
  )
}

export default MyProfilePage
