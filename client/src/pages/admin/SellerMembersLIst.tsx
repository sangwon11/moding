import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../utils/axios.utils";
import { Container, Title, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell } from './List.styles';
import { frontEndAuthMiddleware } from '../../utils/jwtUtils';

interface MemberData {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

const SellerMembersList: React.FC = () => {
  const [members, setMembers] = useState<MemberData[]>([]);

  const fetchMembers = async () => {
    try {
      const config = await frontEndAuthMiddleware({
        method: "get",
        url: "/admin/sellers",
      });

      const response = await axiosInstance.request(config);
      if (response.data && Array.isArray(response.data.data)) {
        setMembers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
    
    const handleDelete = async (memberId: string) => {
      try {
        const config = await frontEndAuthMiddleware({
          method: "post",
          url: `/admin/member/${memberId}`, // URL 수정
        });
  
        await axiosInstance.request(config);
        // 삭제후 회원목록 다시불러오기
        await fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    };
    useEffect(() => {
    fetchMembers();
  }, []);
  
  return (
    <Container>
      <Title>셀러 관리</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>아이디</TableHeaderCell>
            <TableHeaderCell>이름</TableHeaderCell>
            <TableHeaderCell>이메일</TableHeaderCell>
            <TableHeaderCell>가입일</TableHeaderCell>
            <TableHeaderCell>작업</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map(member => (
            <TableRow key={member._id}>
              <TableCell>{member._id}</TableCell>
              <TableCell>{member.username}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <button onClick={() => handleDelete(member._id)}>삭제</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default SellerMembersList;
