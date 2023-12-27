import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface User {
  id: number;
  name: string;
  email: string;
  
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // 유저 데이터를 로드하는 함수
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('/api/v1/user/me'); 
        setUsers(response.data);
      } catch (error) {
        console.error('유저 데이터를 로드하는데 실패했습니다.', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>유저 관리</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;