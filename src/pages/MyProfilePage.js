import React from 'react'
import { Container } from 'reactstrap'
import TowPic from '../images/tow.svg'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const MyProfilePage = ({ currentUser }) => {
  let history = useHistory()

  if (!currentUser.jwt) {
    history.push('/')
    toast('Please log in first')
  }

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
    </Container>
  )
}

export default MyProfilePage
