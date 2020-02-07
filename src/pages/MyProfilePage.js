import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import TowPic from '../images/tow.svg'
import Axios from 'axios'
import posed from 'react-pose'

const PosedContainer = posed.div({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
});

const PosedH3 = posed.h3({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

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
    <PosedContainer>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '50px'
        }}
      >
        <img style={{ maxWidth: '400px', width: '100%' }} src={TowPic} alt="under construction" />
        <PosedH3 className="text-muted text-center mt-5">
          Hey {currentUser.user.username}! Sorry, your page is under construction!
        </PosedH3>
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
    </PosedContainer>
  )
}

export default MyProfilePage
