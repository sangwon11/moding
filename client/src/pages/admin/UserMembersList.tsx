import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Title, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell} from './List.styles'


interface MemberData {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

const UserMembersList: React.FC = () => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbSI6ImFkbWluQGFkbWluLmNvbSIsInJvIjoiYWRtaW4iLCJ1c2VySWQiOiI2NTgyZjJhOTdhZDQwMTZkY2VmYjAzMjYiLCJpYXQiOjE3MDM3NDc1NjIsImV4cCI6MTcwMzgzMzk2Mn0.Y-O-mu92DR7XsDELJUYDbvhmrf5zsFsqyIUKsLYNtpE';

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/v1/admin/members', {
          headers: {
            'Authorization': `Bearer ${authToken}`  
          }
        });

        if (response.data.success) {
          setMembers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <Container>
      <Title>회원 관리</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>아이디</TableHeaderCell>
            <TableHeaderCell>이름</TableHeaderCell>
            <TableHeaderCell>이메일</TableHeaderCell>
            <TableHeaderCell>가입일</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map(member => (
            <TableRow key={member._id}>
              <TableCell>{member._id}</TableCell>
              <TableCell>{member.username}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserMembersList;
