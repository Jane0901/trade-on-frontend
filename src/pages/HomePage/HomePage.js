import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { MediumButton } from '../../components/buttons'
import Container from '../../components/Container'
import homeBanner from '../../images/homeBanner.svg'
import homeIntro from '../../images/homeIntro.svg'
import Carousel from '../../components/Carousel/Carousel'
import { getPublicPosts } from '../../WebAPI'

const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7rem;
  ${MEDIA_QUERY_MD} {
    flex-direction: column-reverse;
    margin-bottom: 5rem;
  }
`

const BannerTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  flex: 1;
  ${MEDIA_QUERY_MD} {
    margin: 3rem 0 0;
  }
`

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0 0 2rem;
  letter-spacing: 0.2rem;
  color: ${(props) => props.theme.primary_200};
  ${MEDIA_QUERY_MD} {
    display: none;
  }
`

const SubTitle = styled.h2`
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.primary_200};
`

const BannerImgWrapper = styled.div`
  flex: 2;
  width: 100%;
  ${MEDIA_QUERY_MD} {
    max-width: 44rem;
    flex: 1;
  }
`

const BannerImage = styled.img`
  width: 100%;
`

const HomeRecommended = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
`

const Intro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`

const IntroImgWrapper = styled.div`
  margin-right: 4rem;
  ${MEDIA_QUERY_MD} {
    margin: 0 0 3rem;
  }
`

const IntroImage = styled.img`
  width: 100%;
`

const IntroTextWrapper = styled.div``

const IntroTitle = styled(SubTitle)``

const IntroContent = styled.p`
  margin: 2rem 0;
  font-size: 1.125rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

const GivingPageButton = styled(MediumButton)`
  ${MEDIA_QUERY_MD} {
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;
  }
`

export default function HomePage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPublicPosts(12)
      setPosts(res.data.allPosts)
    }

    fetchPosts()
  }, [])

  return (
    <Container>
      <Banner>
        <BannerTextWrapper>
          <Title>Trade On</Title>
          <SubTitle>?????????????????????????????????</SubTitle>
        </BannerTextWrapper>
        <BannerImgWrapper>
          <BannerImage src={homeBanner} />
        </BannerImgWrapper>
      </Banner>
      <HomeRecommended>
        <Carousel posts={posts} />
      </HomeRecommended>
      <Intro>
        <IntroImgWrapper>
          <IntroImage src={homeIntro} />
        </IntroImgWrapper>
        <IntroTextWrapper>
          <IntroTitle>????????????????????????????????????????????????</IntroTitle>
          <IntroContent>
            ??????????????????????????????????????????????????????????????????????????????????????????
            <br />
            <br />
            ????????????????????????????????????????????????????????????
          </IntroContent>
          <GivingPageButton as={Link} to="/givings">
            ?????????
          </GivingPageButton>
        </IntroTextWrapper>
      </Intro>
    </Container>
  )
}
