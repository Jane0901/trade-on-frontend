import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import {
  Table,
  Head,
  Row,
  Heading,
  Body,
  Data,
  ButtonTableCell,
} from '../../components/table'
import Pagination from '../../components/Pagination/BackstagePagination'
import {
  BackstageCheckBoxLabel,
  BackstageCheckBox,
  BackstageCheckBoxSpan,
  Select,
} from '../../components/textField'
import { BackstageSmallButton } from '../../components/buttons'
import useManageMembers from '../../hooks/useManageMembers'

const Wrapper = styled(Container)`
  max-width: 78rem;
`

const IdentitySelect = styled(Select)`
  height: 1.8rem;
  width: 6rem;
  margin: 0;
  padding: 0 0.3rem;
  font-size: 1rem;
`

const IdentityOption = styled.option``

const SaveBtn = styled(BackstageSmallButton)`
  margin: 0 auto;
`

const EditBtn = styled(BackstageSmallButton)`
  margin: 0 auto;
`

export default function ManageMemberPage() {
  const {
    members,
    currentMembers,
    currentManageMembersPage,
    membersPerPage,
    handleChangeManageMembersPage,
    handleChangeAccountAuthority,
    handleChangeAllow,
    handleChangeMember,
    isUpdating,
    setIsUpdating,
    handleChangeMemberData,
  } = useManageMembers()

  return (
    <Wrapper>
      <PageTitle>會員管理</PageTitle>
      <Table>
        <Head>
          <Row>
            <Heading>帳號</Heading>
            <Heading>暱稱</Heading>
            <Heading>身份</Heading>
            <Heading>贈物文發文</Heading>
            <Heading>贈物文留言</Heading>
            <Heading />
          </Row>
        </Head>
        <Body>
          {currentMembers.map((member) => {
            return (
              <Row key={member.id}>
                <Data data-label="帳號">{member.email}</Data>
                <Data data-label="暱稱">{member.nickname}</Data>
                <Data data-label="身份">
                  {/* 在編輯權限的狀態時，才可以編輯，否則 disabled */}
                  <IdentitySelect
                    id={member.id}
                    defaultValue={member.accountAuthority}
                    onChange={(e) => {
                      handleChangeAccountAuthority(e)
                    }}
                    disabled={!(isUpdating === member.id)}
                  >
                    <IdentityOption value="admin">管理員</IdentityOption>
                    <IdentityOption value="user">一般會員</IdentityOption>
                  </IdentitySelect>
                </Data>
                <Data data-label="贈物文發文">
                  <BackstageCheckBoxLabel>
                    <BackstageCheckBox
                      id={member.id}
                      value="isAllowPost"
                      onChange={handleChangeAllow}
                      defaultChecked={member.isAllowPost}
                      disabled={!(isUpdating === member.id)}
                    />
                    <BackstageCheckBoxSpan />
                  </BackstageCheckBoxLabel>
                </Data>
                <Data data-label="贈物文留言">
                  <BackstageCheckBoxLabel>
                    <BackstageCheckBox
                      id={member.id}
                      value="isAllowMessage"
                      onChange={handleChangeAllow}
                      defaultChecked={member.isAllowMessage}
                      disabled={!(isUpdating === member.id)}
                    />
                    <BackstageCheckBoxSpan />
                  </BackstageCheckBoxLabel>
                </Data>
                <ButtonTableCell>
                  {/* 在編輯權限的狀態時，顯示 "儲存" 按鈕 */}
                  {isUpdating === member.id ? (
                    <SaveBtn
                      id={member.id}
                      onClick={() => handleChangeMember(member.id)}
                    >
                      儲存
                    </SaveBtn>
                  ) : (
                    member.email !== 'admin123@mail.com' && (
                      <EditBtn
                        id={member.id}
                        onClick={() => {
                          setIsUpdating(member.id)
                          handleChangeMemberData(member.id)
                        }}
                      >
                        編輯
                      </EditBtn>
                    )
                  )}
                </ButtonTableCell>
              </Row>
            )
          })}
        </Body>
      </Table>
      <Pagination
        dataPerPage={membersPerPage}
        totalData={members.length}
        handleChangePage={handleChangeManageMembersPage}
        currentPage={currentManageMembersPage}
      />
    </Wrapper>
  )
}
