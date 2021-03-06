import { useContext } from 'react'
import AuthContext from '../../contexts'
import styled from 'styled-components'
import { SmallButton } from '../../components/buttons'
import { Textarea } from '../../components/textField'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import Swal from 'sweetalert2'

/* Form - 整個區塊 */
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 50px;
  max-width: 557px;
`

/* TextArea - 輸入留言的地方 */
const TextArea = styled(Textarea)`
  height: 8rem;
  font-size: 16px;
  padding: 15px;
  padding-left: 30px;
  &:focus {
    border: 1px solid ${(props) => props.theme.general_600};
  }
  ${MEDIA_QUERY_SM} {
    max-width: 80%;
  }
`
/* MessageSubmitButton - 送出留言的按鈕 */
const MessageSubmitButton = styled(SmallButton)`
  margin: 10px 0;
`

const LargeTextArea = ({
  isApplyMessage,
  post,
  newMessageInput,
  setNewMessageInput,
  handleReplySubmit,
  handleAddQuestionSubmit,
  addNewComment,
  relatedMsg,
  postIsGoal,
}) => {
  // 拿到 登入後的使用者資料
  const { user } = useContext(AuthContext)

  const alertIsAllowMessage = () => {
    if (user.isAllowMessage) {
      addNewComment
        ? handleAddQuestionSubmit(
            post,
            newMessageInput,
            setNewMessageInput,
            isApplyMessage
          )
        : handleReplySubmit(relatedMsg, isApplyMessage)
    } else {
      Swal.fire({
        icon: 'warning',
        title: '警告',
        text: '此帳號已被禁止留言',
        showConfirmButton: false,
      })
    }
  }

  return (
    <>
      <Form>
        {/* 輸入留言的地方 */}
        <TextArea
          rows="3"
          cols="70"
          maxlength="200"
          placeholder="請輸入您的留言 / 提問"
          name="addNewMessage"
          value={newMessageInput}
          onChange={(e) => setNewMessageInput(e.target.value)}
          required
          disabled={postIsGoal}
        ></TextArea>

        {/* 送出留言的按鈕 */}
        {/* 點擊 "送出留言" 按鈕後的操作，透過 addNewComment 這個 props， 判斷是 "留言"還是 "回覆" ，再執行各自操作*/}
        <MessageSubmitButton
          type="submit"
          onClick={alertIsAllowMessage}
          disabled={postIsGoal}
        >
          送出留言
        </MessageSubmitButton>
      </Form>
    </>
  )
}

export default LargeTextArea
