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

  a {
    margin-bottom: 10px;
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
    Axios.get(GET_ALL_USERS).then(result => {
      setUsers(result.data)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingIndicator fullPage />

  return (
    <Container>
      {users.map(({ id, username, profileImage }) => (
        <EachUser key={id}>
          <Col sm={3} className="p-0">
            <UserAvatar>
              <Link to={`/users/${id}`}>{username}</Link>
              <img src={profileImage} alt="user avatar" />
            </UserAvatar>
          </Col>
          <Col sm={9} className="p-0">
            <UserImages userId={id} />
          </Col>
        </EachUser>
      ))}
    </Container>
  )
}

export default HomePage
