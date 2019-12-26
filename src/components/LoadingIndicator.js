import React from 'react'
import Bird from '../loading.gif'
import styled from 'styled-components'

const Image = styled.img`
  height: 150px;
  position: ${props => (props.fullPage ? 'fixed' : 'absolute')};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LoadingIndicator = ({ fullPage = false }) => {
  return <Image src={Bird} fullPage={fullPage} />
}

export default LoadingIndicator
