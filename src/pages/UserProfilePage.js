import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import LoadingIndicator from '../components/LoadingIndicator'
import { GET_USER_INFO } from '../constants/api'
import UserImages from '../containers/UserImages'

const Page = styled.div`
  text-align: center;

  .profile-img {
    display: block;
    height: 150px;
    border-radius: 50%;
    margin: auto;
  }
`

const UserProfilePage = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios.get(GET_USER_INFO(id)).then(result => {
      setUser(result.data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <LoadingIndicator fullPage />

  return (
    <Page>
      <h2>{user.username}</h2>
      <img className="profile-img" src={user.profileImage} alt="user avatar" />
      <hr />
      <UserImages userId={user.id} center/>
    </Page>
  )
}

export default UserProfilePage
