import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import { GET_ALL_USERS } from '../constants/api'
import UserImages from '../containers/UserImages'
import LoadingIndicator from '../components/LoadingIndicator'

const EachUser = styled(Row)`
  padding: 10px 5px;
  margin-bottom: 3em;
`

const UserAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1em;

  a {
    margin-top: 10px;
    color: #505f6f;
  }

  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
`

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unmounted = false
    Axios.get(GET_ALL_USERS).then(result => {
      if (!unmounted) {
        setUsers(result.data)
        setLoading(false)
      }
    })
    return () => {
      unmounted = true
    }
  }, [])

  if (loading) return <LoadingIndicator fullPage />

  return (
    <Container>
      {users.map(({ id, username, profileImage }) => (
        <EachUser key={id}>
          <Col md={3} className="p-0">
            <UserAvatar>
              <img src={profileImage} alt="user avatar" />
              <Link to={`/users/${id}`}>@{username}</Link>
            </UserAvatar>
          </Col>
          <Col md={9} className="p-0">
            <UserImages userId={id} />
          </Col>
        </EachUser>
      ))}
    </Container>
  )
}

export default HomePage
