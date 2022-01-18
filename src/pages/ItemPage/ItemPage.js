import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../contexts'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import Container from '../../components/Container'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { LargeButton } from '../../components/buttons'

// 引入 react icons
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as ImIcons from 'react-icons/im'

// 引入 AsNavFor （圖片輪播）
import AsNavFor from './AsNavFor'

// 引入 留言
import { Comments } from './comments'

// 引入填寫留言的區塊
import LargeTextArea from './textArea'

// 引入撈取單筆 post 的 API
import { getPost } from '../../WebAPI'

// 引入操作留言的 hook
import useComments from '../../hooks/useComments'

// 引入操作 "想要禮物" 按鈕的 hook
import useWantItem from '../../hooks/useWantItem'

// 引入 "想要禮物" 按鈕點擊後的彈窗 component
import ManageWantItem from '../../components/ManageWantItem'

/* 禮物詳情頁最上方 "物品" 資訊的全部區塊 */
const GiftDetails = styled.div`
  // max-width: 960px;
  max-width: 90%;
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-left: 0px;
  }
`

/* "物品" 資訊：左側全部的區塊 */
const DetailLeft = styled.div`
  width: 527px;
  height: 626px;

  ${MEDIA_QUERY_SM} {
    width: 100%;
    height: 600px;
    margin-bottom: 0px auto 10px;
  }
`
/* "物品" 資訊：右側全部的區塊 */
const DetailRight = styled.div`
  width: 340px;
  height: 626px;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  margin-left: 25px;
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-bottom: 100px;
  }
`
/* "物品" 資訊右側：贈物者資訊 */
const Donor = styled.div`
  margin-bottom: 38px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

/* 贈物者頭像 */
const DonorAvatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 17px;
  border-radius: 50%;
  // background-color: ${(props) => props.theme.primary_200};
  cursor: pointer;
`

/* 贈物者暱稱 */
const DonorNickname = styled(Link)`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: inherit;
  // text-decoration: none;
`

/* "物品" 資訊右側：物品名稱 */
const GiftTitle = styled.div`
  margin-bottom: 40px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${(props) => props.theme.general_500};
  font-size: 26px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* "物品" 資訊右側：物品細節 */
const GiftDetail = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* 每一項物品細節前的 icon */
const Icon = styled.div`
  width: 26px;
  height: 26px;
  color: ${(props) => props.theme.primary_300};
`

/* 每一項物品細節的內容 */
const Label = styled.div`
  margin-left: 17px;
  font-size: 1.35rem;
  ${MEDIA_QUERY_SM} {
    font-size: 4vmin;
  }
`

/* 分類、寄送地點、寄送方式、物品狀態、運費支付 */
const GiftItems = styled.li`
  display: flex;
  margin-bottom: 45px;
  ${MEDIA_QUERY_SM} {
    margin-bottom: 30px;
  }
`

/* "編輯禮物" 、"想要禮物" 按鈕 */
const HandleGiftButton = styled(LargeButton)`
  margin-top: 30px;
  font-size: 20px;
  max-width: 100%;
`

/* 禮物詳情頁下方的全部區塊 */
const GiftContent = styled.div``

/* 禮物詳情頁的 "物品介紹" 區塊 */
const GiftIntro = styled.div`
  // max-width: 557px;
  max-width: 54%;
  margin: -65px 0px 100px 0px;
  margin-left: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 2px solid ${(props) => props.theme.general_500};

  ${MEDIA_QUERY_SM} {
    max-width: 90%;
  }
`
/* 物品介紹的標題 */
const IntroTitle = styled.div`
  border-left: 10px solid ${(props) => props.theme.primary_200};
  padding-left: 17px;
  font-size: 24px;
  margin-bottom: 50px;
`

/* 物品介紹的內文 */
const IntroContent = styled.div`
  white-space: pre-line;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin-bottom: 50px;
`

export default function ItemPage() {
  // 拿到 使用者登入後的 localStorage 資料
  const { user } = useContext(AuthContext)

  // 取得 URL 上 id 的參數
  const { id } = useParams()
  // console.log('id', id)

  // 帶入 useWantItem 中的 wantPopUp, handleToggleWantPopUp,
  const { wantPopUp, handleToggleWantPopUp } = useWantItem()

  // 將參數帶入並取得 useComments 中 handleSubmit function
  // 參數:false => 判斷是否索取 / id => post 的 id
  const { handleAddQuestionSubmit } = useComments(false, id)

  // 設定 post 的 state
  const [post, setPost] = useState({})

  // 設定 新增留言的 state
  const [newMessageInput, setNewMessageInput] = useState('')

  useEffect(() => {
    // 串接拿到單筆的 post 的 API
    const fetchPost = async () => {
      const res = await getPost(id)
      // 成功拿到資料後，將資料更新到 post 的 state
      if (res.data.message === 'success') {
        setPost(res.data.post)
      }
    }

    fetchPost()
  }, [])

  return (
    <>
      <Container>
        {/* 禮物詳情頁最上方的 "物品" 資訊 */}
        <GiftDetails>
          {/* "物品" 資訊：左側 */}
          <DetailLeft>
            {/* 圖片輪播 */}
            {/*  帶入 post 的資料到 props*/}
            <AsNavFor post={post}></AsNavFor>
          </DetailLeft>

          {/* "物品" 資訊：右側 */}
          <DetailRight>
            {/* "物品" 資訊右側：贈物者資訊 */}
            {/* 由於非同步的關係, 確認先有 post 的 author 資料,再撈 author 下一層的物件 */}
            {post.author && post.author._id && (
              <Donor>
                {/* 贈物者頭像 */}
                <Link to={`/portfolio/${post.author._id}`}>
                  <DonorAvatar src={post.author.avatarUrl}></DonorAvatar>
                </Link>

                {/* 贈物者暱稱 */}
                <DonorNickname to={`/portfolio/${post.author._id}`}>
                  {post.author.nickname}
                </DonorNickname>
              </Donor>
            )}

            {/* "物品" 資訊右側：物品名稱 */}
            <GiftTitle> {post.itemName}</GiftTitle>

            {/* "物品" 資訊右側：物品細節 */}
            <GiftDetail>
              {/* 分類 */}
              <GiftItems>
                <Icon>
                  <FaIcons.FaTags />
                </Icon>
                <Label>{post.category && post.category.categoryName}</Label>
              </GiftItems>

              {/* 寄送地點 */}
              {/* 如果寄送方式有包含 "面交" 時才顯示 */}
              {post.tradingOptions && post.tradingOptions.faceToFace && (
                <GiftItems>
                  <Icon>
                    <ImIcons.ImLocation />
                  </Icon>
                  <Label>
                    {post.tradingOptions.faceToFace.region}
                    {post.tradingOptions.faceToFace.district}
                  </Label>
                </GiftItems>
              )}

              {/* 寄送方式 */}
              <GiftItems>
                <Icon>
                  <FaIcons.FaTruckLoading />
                </Icon>
                <Label>
                  寄送方式：
                  {/* 面交、7-11 店到店、全家店到店 */}
                  {post.tradingOptions &&
                    post.tradingOptions.selectedMethods &&
                    post.tradingOptions.selectedMethods.map((item) => {
                      if (item === '面交') return '面交'
                      if (item === '7-11') return '7-11 店到店 / '
                      if (item === '全家') return '全家店到店 / '
                      return false
                    })}
                </Label>
              </GiftItems>

              {/* 物品狀態 */}
              <GiftItems>
                <Icon>
                  <FaIcons.FaInfoCircle />
                </Icon>
                <Label>物品狀態： {post.itemStatus}</Label>
              </GiftItems>

              {/* 運費支付 */}
              <GiftItems>
                <Icon>
                  <MdIcons.MdMonetizationOn />
                </Icon>
                <Label>運費支付：{post.payer}支付運費</Label>
              </GiftItems>
            </GiftDetail>

            {/* 判斷是否為發文者，顯示不同的按鈕 */}
            {/* 當登入者與發文者為同一人時,顯示 "編輯禮物" 按鈕,否則顯示 "想要禮物" 按鈕 */}
            {user && post.author && user.id === post.author._id ? (
              <HandleGiftButton as={Link} to="/givings/edit">
                編輯禮物
              </HandleGiftButton>
            ) : user ? (
              <HandleGiftButton onClick={() => handleToggleWantPopUp(post.id)}>
                想要禮物
              </HandleGiftButton>
            ) : (
              <HandleGiftButton as={Link} to="/login">
                想要禮物
              </HandleGiftButton>
            )}

            {/* 點擊 "想要禮物" 按鈕後,顯示申請索取的彈出視窗 */}
            {wantPopUp && (
              <ManageWantItem
                isApplyMessage={true}
                post={post}
                postMessageId={post.id}
                handleToggleWantPopUp={handleToggleWantPopUp}
              />
            )}
          </DetailRight>
        </GiftDetails>

        <GiftContent>
          {/* 禮物詳情頁的 "物品介紹" 區塊 */}
          <GiftIntro>
            {/* 物品介紹的標題 */}
            <IntroTitle>物品介紹 </IntroTitle>
            {/* 物品介紹的內文 */}
            <IntroContent>
              {/* todo: 顯示輸入的文字格式及樣式 */}
              {post.description}
            </IntroContent>
          </GiftIntro>

          {/* 禮物詳情頁的 "想要禮物" 區塊 */}
          <GiftIntro>
            {/* 想要禮物的標題 */}
            <IntroTitle>想要禮物</IntroTitle>
            {/* 想要禮物的內文 */}
            {/* 留言內容 */}
            {post.author && (
              <Comments
                isApplyMessage={true}
                post={post}
                postMessageId={post.id}
                postAuthorId={post.author._id}
              ></Comments>
            )}
          </GiftIntro>

          {/* 禮物詳情頁的 "留言" 區塊 */}
          <GiftIntro>
            {/* 留言的標題 */}
            <IntroTitle>留言</IntroTitle>
            {/* 填寫留言的區塊，登入後顯示並可留言 */}
            {user ? (
              <LargeTextArea
                isApplyMessage={false}
                post={post}
                newMessageInput={newMessageInput}
                setNewMessageInput={setNewMessageInput}
                addNewComment={true}
                handleAddQuestionSubmit={handleAddQuestionSubmit}
              ></LargeTextArea>
            ) : null}

            {/* 顯示留言內容 */}
            <Comments isApplyMessage={false} postMessageId={post.id}></Comments>
          </GiftIntro>
        </GiftContent>
      </Container>
    </>
  )
}
