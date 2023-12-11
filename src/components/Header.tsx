import React from 'react';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className='text-blue-500'>
        헤더
    </div>
  );
};

export default Header;