import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { SmallButton } from '../../components/buttons'
import LargeTextArea from './textArea'

/* CommentsContainer - 留言的整個區塊 */
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY_SM} {
    width: 90%;
  }
`
/*  Comment - 主留言 */
const Comment = styled.div`
  margin-bottom: 50px;
`

/* CommentTop - 留言最上方 */
const CommentTop = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
`

/* CommentNickname - 留言最上方的留言者暱稱 */
const CommentNickname = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.primary_300};
`

/* GivingGift - "送他禮物" 按鈕 */
const GivingGift = styled(SmallButton)``

/* CommentContent - 留言的留言內容 */
const CommentContent = styled.div`
  width: 80%;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;

  letter-spacing: 0.5px;
`

/* CommentBottom - 留言的最下方 */
const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
`

/* CommentTime - 留言的最下方的發送留言時間 */
const CommentTime = styled.div`
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: ${(props) => props.theme.general_500};
`

/* CommentUpdates - 留言的最下方的留言更新區塊 */
const CommentUpdates = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  cursor: pointer;
`

/* CommentReply - 留言的最下方的回覆留言 */
const CommentReply = styled.div`
  color: ${(props) => props.theme.primary_300};
  &:hover {
    color: ${(props) => props.theme.primary_250};
  }
`

/* CommentEdit - 留言的最下方的編輯留言 */
const CommentEdit = styled.div`
  color: ${(props) => props.theme.primary_300};

  &:hover {
    color: ${(props) => props.theme.primary_250};
  }
`

/* CommentDelete - 留言的最下方的刪除留言 */
const CommentDelete = styled.div`
  color: ${(props) => props.theme.danger_100};
  &:hover {
    color: ${(props) => props.theme.danger_000};
  }
`

/* SubCommentContainer - 子留言全部區塊 */
const SubCommentContainer = styled.div`
  width: 85%;
  margin-bottom: 50px;
  margin-left: 35px;
  padding-left: 10px;
  border-left: 2px solid ${(props) => props.theme.general_300};
`

/* SubComment - 子留言 */
const SubComment = styled.div`
  margin-bottom: 25px;
`

function comments() {
  return (
    <CommentsContainer>
      {/* 主留言 */}
      <Comment>
        {/* 留言最上方 */}
        <CommentTop>
          {/* 留言最上方的留言者暱稱 */}
          <CommentNickname>Willy</CommentNickname>

          {/* "送他禮物" 按鈕 */}
          <GivingGift>送他禮物</GivingGift>
        </CommentTop>

        {/* 留言的留言內容 */}
        <CommentContent>
          您好，我平常有隨手筆記的習慣，很喜歡這個手帳，盼能獲贈。謝謝分享！
        </CommentContent>

        {/* 留言的最下方 */}
        <CommentBottom>
          <CommentTime>2021/10/14 14:01</CommentTime>

          {/* 留言的最下方的留言更新區塊 */}
          <CommentUpdates>
            <CommentReply>回覆</CommentReply>
            <CommentEdit> | 編輯留言</CommentEdit>
            <CommentDelete> | 刪除留言</CommentDelete>
          </CommentUpdates>
        </CommentBottom>

        {/* 輸入留言的區塊 */}
        <LargeTextArea></LargeTextArea>
      </Comment>

      {/* 子留言全部區塊 */}
      <SubCommentContainer>
        {/* 子留言 */}
        <SubComment>
          <CommentTop>
            <CommentNickname>Kimi</CommentNickname>
          </CommentTop>
          <CommentContent>準備寄送囉，記得先付運費哊！</CommentContent>
          <CommentBottom>
            <CommentTime>2021/10/14 14:07</CommentTime>
            <CommentUpdates>
              <CommentReply>回覆</CommentReply>
              <CommentEdit> | 編輯留言</CommentEdit>
              <CommentDelete> | 刪除留言</CommentDelete>
            </CommentUpdates>
          </CommentBottom>
          <LargeTextArea></LargeTextArea>
        </SubComment>

        {/* 子留言 */}
        <SubComment>
          <CommentTop>
            <CommentNickname>Willy</CommentNickname>
          </CommentTop>
          <CommentContent>已付運費囉～ 感謝 </CommentContent>
          <CommentBottom>
            <CommentTime>2021/10/14 14:21</CommentTime>
            <CommentUpdates>
              <CommentReply>回覆</CommentReply>
              <CommentEdit> | 編輯留言</CommentEdit>
              <CommentDelete> | 刪除留言</CommentDelete>
            </CommentUpdates>
          </CommentBottom>
        </SubComment>
      </SubCommentContainer>
    </CommentsContainer>
  )
}

export default comments
