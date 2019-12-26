import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import { GET_ALL_USERS } from '../constants/api'
import UserImages from '../containers/UserImages'
import LoadingIndicator from '../components/LoadingIndicator'

const UserAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  a {
    margin-bottom: 10px;
  }

  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios.get(GET_ALL_USERS).then(result => {
      console.log(result.data)
      setUsers(result.data)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingIndicator fullPage />

  return (
    <Container>
      {users.map(({ id, username, profileImage }) => (
        <Row key={id} className="my-4">
          <Col sm={3} className="p-0">
            <UserAvatar>
              <Link to={`/users/${id}`}>{username}</Link>
              <img src={profileImage} />
            </UserAvatar>
          </Col>
          <Col sm={9} className="p-0">
            <UserImages userId={id} />
          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default HomePage
