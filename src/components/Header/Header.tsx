import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faFacebookMessenger,
} from '@fortawesome/free-brands-svg-icons';
import {
  faSearch,
  faUserCircle,
  faBell,
  faCaretDown,
  faHome,
  faTv,
  faStore,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

// --- Styled Components ---

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

// --- Left Section (Logo and Search) ---

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 300px; /* Consistent width for branding/search */
`;

const FacebookLogo = styled.a`
  color: #1877f2; /* Facebook Blue */
  font-size: 40px;
  margin-right: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f2f5; /* Light gray background */
  border-radius: 50px;
  padding: 8px 12px;
  max-width: 240px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #606770;
  margin-right: 8px;
  font-size: 16px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  color: #050505;
  width: 100%;
  &::placeholder {
    color: #606770;
  }
`;

// --- Middle Section (Navigation) ---

const HeaderMiddle = styled.nav`
  display: flex;
  justify-content: center;
  flex: 1; /* Takes up remaining space */
  max-width: 700px;
`;

const NavLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 112px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#1877f2' : '#606770')};
  position: relative;
  transition: background-color 0.15s;

  &:hover {
    background-color: #f0f2f5;
    border-radius: 8px;
  }

  svg {
    font-size: 24px;
  }

  ${({ active }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: #1877f2;
      border-radius: 999px;
    }
  `}
`;

// --- Right Section (User and Actions) ---

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 300px;
  justify-content: flex-end;
`;

const UserProfile = styled.a`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #f0f2f5;
  }
`;

const UserAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  margin-left: 8px;
  font-weight: 600;
  font-size: 15px;
  color: #050505;
  white-space: nowrap;
`;

const ActionButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e4e6eb;
  color: #050505;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: #d8dadf;
  }
`;

const Header: React.FC = () => {
  // Placeholder user data
  const currentUser = {
    name: 'أحمد',
    avatarUrl: 'https://via.placeholder.com/150/1877f2/ffffff?text=A', // Replace with actual avatar URL
  };

  return (
    <HeaderContainer>
      {/* Left Section */}
      <HeaderLeft>
        <FacebookLogo href="/">
          <FontAwesomeIcon icon={faFacebookSquare} />
        </FacebookLogo>
        <SearchBarContainer>
          <SearchIcon icon={faSearch} />
          <SearchInput placeholder="بحث في فيسبوك" aria-label="Search Facebook" />
        </SearchBarContainer>
      </HeaderLeft>

      {/* Middle Section - Navigation */}
      <HeaderMiddle>
        <NavLink href="/" active>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink href="/watch">
          <FontAwesomeIcon icon={faTv} />
        </NavLink>
        <NavLink href="/marketplace">
          <FontAwesomeIcon icon={faStore} />
        </NavLink>
        <NavLink href="/groups">
          <FontAwesomeIcon icon={faUsers} />
        </NavLink>
        {/* Placeholder for Gaming/Other Icons */}
      </HeaderMiddle>

      {/* Right Section - Actions and Profile */}
      <HeaderRight>
        <UserProfile href="/profile">
          <UserAvatar src={currentUser.avatarUrl} alt={currentUser.name} />
          <UserName>{currentUser.name}</UserName>
        </UserProfile>

        {/* Create/Menu Icon (Often omitted in simplified clone) */}
        
        <ActionButton>
          <FontAwesomeIcon icon={faFacebookMessenger} fontSize={20} />
        </ActionButton>
        <ActionButton>
          <FontAwesomeIcon icon={faBell} fontSize={20} />
        </ActionButton>
        <ActionButton>
          <FontAwesomeIcon icon={faCaretDown} fontSize={20} />
        </ActionButton>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;