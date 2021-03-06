import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'

export const InputLabel = styled.label`
  font-size: 1.125rem;
  display: block;
  margin-top: 1.2rem;
`

export const InputErrorMessage = styled.p`
  color: ${(props) => props.theme.danger_100};
  margin-top: 0.5rem;
  font-size: 0.9rem;
`

export const Input = styled.input`
  display: block;
  height: 2.5rem;
  width: 100%;
  margin-top: 1.2rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.secondary};
  border: 1px solid
    ${({ isWarning }) => {
      return isWarning
        ? (props) => props.theme.danger_100
        : (props) => props.theme.general_300
    }};
  border-radius: 0.25rem;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.general_300};
    font-weight: 100;
  }
  :-ms-input-placeholder {
    color: ${(props) => props.theme.general_300};
    font-weight: 100;
  }
  $:focus,
  &:active {
    outline: none;
    border: 1px solid #f00;
  }
`

export const InputPassword = styled(Input).attrs({ type: 'password' })``

export const Textarea = styled.textarea`
  display: block;
  height: 10rem;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1.2rem;
  color: ${(props) => props.theme.secondary};
  border: 0.1rem solid
    ${({ isWarning }) => {
      return isWarning
        ? (props) => props.theme.danger_100
        : (props) => props.theme.general_300
    }};
  border-radius: 0.25rem;
  resize: none;
  outline: none;
  line-height: 1.5;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.general_300};
    font-weight: 100;
  }
  :-ms-input-placeholder {
    color: ${(props) => props.theme.general_300};
    font-weight: 100;
  }
`

export const Select = styled.select`
  height: 2.5rem;
  width: 100%;
  margin-top: 1.2rem;
  padding: 0 0.5rem;
  border: 1px solid
    ${({ isWarning }) => {
      return isWarning
        ? (props) => props.theme.danger_100
        : (props) => props.theme.general_300
    }};
  border-radius: 0.25rem;
  outline: none;
  color: ${(props) => props.theme.secondary};
`

export const RadioWrapper = styled.div`
  margin-top: 20px;
`

export const RadioItem = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  border: 1px solid ${(props) => props.theme.general_300};
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 15px;
  padding-right: 10px;
`

export const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid ${(props) => props.theme.general_300};
`
export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: ${(props) => props.theme.general_300};
    &::after {
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
  &:checked + ${RadioItem} {
    background: ${(props) => props.theme.primary_200};
    border: 2px solid ${(props) => props.theme.primary_200};
  }
  &:checked + ${RadioButtonLabel} {
    background: ${(props) => props.theme.primary_200};
    border: 1px solid ${(props) => props.theme.primary_200};
    &::after {
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
`

export const CheckBoxLabel = styled.label`
  display: block;
  position: relative;
  margin-top: 1.2rem;
  padding-left: 1.8rem;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: normal;
  line-height: 1.5;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover span {
    background: ${(props) => props.theme.primary_100};
  }

  input:disabled ~ span {
    opacity: 0.5;
  }
`
export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  :checked ~ span {
    background: ${(props) => props.theme.primary_200};
    border: none;
  }

  :checked ~ span:after {
    display: block;
  }
`

export const CheckBoxSpan = styled.span`
  position: absolute;
  top: 0.2rem;
  left: 0;
  height: 1.25rem;
  width: 1.25rem;
  border: 0.1rem solid ${(props) => props.theme.general_300};
  border-radius: 0.25rem;

  :after {
    content: '';
    position: absolute;
    display: none;
    left: 0.4rem;
    top: 0.15rem;
    width: 0.3rem;
    height: 0.6rem;
    border: solid ${(props) => props.theme.general_000};
    border-width: 0 0.2rem 0.2rem 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const BackstageCheckBoxLabel = styled(CheckBoxLabel)`
  margin: 0;
  padding: 0;
  position: static;
  :hover input ~ span {
    background: ${(props) => props.theme.secondary_100};
  }

  input:checked ~ span {
    background: ${(props) => props.theme.secondary_200};
    border: none;
  }

  ${MEDIA_QUERY_SM} {
    position: relative;
    height: 1.25rem;
  }
`

export const BackstageCheckBox = styled(CheckBox)``

export const BackstageCheckBoxSpan = styled(CheckBoxSpan)`
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 0.1rem solid ${(props) => props.theme.general_300};
  ${MEDIA_QUERY_SM} {
    left: 100%;
    transform: translateX(-100%) translateY(-50%);
  }
`

export const BackstageInputCheckBox = ({ isChecked }) => (
  <BackstageCheckBoxLabel>
    <BackstageCheckBox checked={isChecked} />
    <BackstageCheckBoxSpan />
  </BackstageCheckBoxLabel>
)
