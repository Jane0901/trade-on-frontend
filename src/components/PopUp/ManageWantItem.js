import styled from 'styled-components'
import { Textarea } from '../textField'
import { BackstageTitle } from '../heading'
import { SmallButton } from '../buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import shippingMethod from '../../constants/shippingMethod'

// 引入 radio 相關 component
import { RadioItem, RadioButtonLabel, RadioButton } from '../textField'

// 引入 彈窗底下的遮罩 component
import Backdrop from '../../components/PopUp/Backdrop'

// 引入彈窗 component
import PopUp from '../../components/PopUp/PopUp'

// 引入 useWantItem
import useWantItem from '../../hooks/useWantItem'

// 引入 InputErrorMessage 這個 component
import { InputErrorMessage } from '../textField'

/* 彈窗底下的遮罩 */
const PopUpBackDrop = styled(Backdrop)``

/* 整個索取請求的彈窗 */
const GiveItemWrapper = styled(PopUp)`
  padding: 0rem 3rem;
`

/* 索取請求彈窗的標題 */
const Title = styled(BackstageTitle)`
  font-weight: 500;
  padding-bottom: 7px;
  text-align: left;
  border-bottom: 2px solid ${(props) => props.theme.general_500};
  margin: 2rem 0 1.25rem 0;
`

/* 索取項目的細節 */
const GiveDetail = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 20px;
`

/* 索取請求的留言內容  */
const ApplyMessageInput = styled(Textarea)`
  width: 100%;
  height: 7rem;

  ${MEDIA_QUERY_SM} {
    height: 5rem;
  }
`

/* 彈窗下方操作按鈕們的全部區塊 */
const ConfirmButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 32px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`
/* "取消" 按鈕 */
const CancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`
/* "確認" 按鈕 */
const GiveButton = styled(SmallButton)`
  margin-left: 27px;
  background-color: ${(props) => props.theme.primary_100};
  :hover {
    background-color: ${(props) => props.theme.primary_200};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
`

export default function ManageGiveItem({
  isApplyMessage,
  post,
  postMessageId,
  handleToggleWantPopUp,
  applyMsgs,
  setApplyMsgs,
}) {
  // 引入 shippingMethod 物件
  const { faceToFace, sevenEleven, familyMart } = shippingMethod

  // 將 applyMsgs,setApplyMsgs,isApplyMessage,post,postMessageId,handleToggleWantPopUp 帶入 useWantItem 中並引入 select, setSelect, newApplyInput, setNewApplyInput, handleWantItem

  const {
    select,
    setSelect,
    newApplyInput,
    setNewApplyInput,
    handleWantItem,
    errorMessages,
  } = useWantItem(
    applyMsgs,
    setApplyMsgs,
    isApplyMessage,
    post,
    postMessageId,
    handleToggleWantPopUp
  )
  return (
    <>
      {/* 彈窗底下的遮罩，點擊彈窗以外的地方，會收回彈窗  */}
      <PopUpBackDrop onClick={handleToggleWantPopUp}></PopUpBackDrop>
      {/* 整個索取請求的彈窗 */}
      <GiveItemWrapper>
        <Title>索取請求</Title>
        <GiveDetail>物品名稱：{post.itemName}</GiveDetail>
        <GiveDetail>物品數量：{post.quantity}</GiveDetail>
        {/* 留言的輸入框 */}
        <GiveDetail>
          留言：
          <ApplyMessageInput
            rows="3"
            maxlength="200"
            name="apply"
            placeholder="請輸入要給贈物者的話"
            value={newApplyInput}
            onChange={(e) => setNewApplyInput(e.target.value)}
            required
          ></ApplyMessageInput>
        </GiveDetail>
        {/* 如果寄送方式可以 "面交" ，出現 "面交" 的單選選項*/}
        {post.tradingOptions.faceToFace ? (
          <RadioItem key={'faceToFace'}>
            <RadioButton
              type="radio"
              name="tradingOptions"
              value="faceToFace"
              checked={select === 'faceToFace'}
              onChange={(e) => setSelect(e.target.value)}
            />
            <RadioButtonLabel />
            <div>{faceToFace}</div>
          </RadioItem>
        ) : null}
        {/* 如果寄送方式可以 "7-11 店到店" ，出現 "7-11 店到店" 的單選選項*/}
        {/* 如果寄送方式可以 "全家店到店" ，出現 "全家店到店" 的單選選項*/}
        {post.tradingOptions &&
          post.tradingOptions.selectedMethods &&
          post.tradingOptions.selectedMethods.map((applyDealMethodItem) => {
            if (applyDealMethodItem === '7-11') {
              return (
                <RadioItem key={'sevenEleven'}>
                  <RadioButton
                    type="radio"
                    name="tradingOptions"
                    value="sevenEleven"
                    checked={select === 'sevenEleven'}
                    onChange={(e) => setSelect(e.target.value)}
                  />
                  <RadioButtonLabel />
                  <div>{sevenEleven}</div>
                </RadioItem>
              )
            }

            if (applyDealMethodItem === '全家') {
              return (
                <RadioItem key={'familyMart'}>
                  <RadioButton
                    type="radio"
                    name="tradingOptions"
                    value="familyMart"
                    checked={select === 'familyMart'}
                    onChange={(e) => setSelect(e.target.value)}
                  />
                  <RadioButtonLabel />
                  <div>{familyMart}</div>
                </RadioItem>
              )
            }
            return false
          })}
        {/* 點擊 "確認"按鈕後先判斷是否有填寄送方式，如果沒有填寫，出現提示，且不讓索取者提出新索取 */}
        <InputErrorMessage>
          {errorMessages ? '要填寄送方式喔！' : null}
        </InputErrorMessage>
        {/* 彈窗下方操作按鈕們的全部區塊 */}
        <ConfirmButtonsWrapper>
          {/* 點擊 "取消" 按鈕後，隱藏索取請求的彈窗 */}
          <CancelButton onClick={handleToggleWantPopUp}>取消</CancelButton>

          {/* 點擊 "確認" 按鈕，執行 "handleWantItem" */}
          <GiveButton type="submit" onClick={handleWantItem}>
            確認
          </GiveButton>
        </ConfirmButtonsWrapper>
      </GiveItemWrapper>
    </>
  )
}
