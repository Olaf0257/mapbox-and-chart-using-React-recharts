import styled from 'styled-components'


export const StyleImage = styled.div`
background-image: url(${props => props.imageUrl});
background-size: cover;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
height:200px;
margin-bottom: 15px;
width: 100%;
`

export const MoreInfoDiv = styled.div`
background-image: url(${props => props.imageUrl});
background-size: cover;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
height: 175px;
margin-bottom: 15px;
pointer-events: auto;
`