

import './MainHeader.css';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search_black_24dp.svg'
import notificationIcon from '../../assets/notifications_black_24dp.svg';
import settingsIcon from '../../assets/settings_black_24dp.svg';
import profilePic from '../../assets/Avatar.png'

const MainHeader = () => {
  return (
    <div className="MainHeader">
      <div className="MainHeader-logo">
        <img src={logo} alt="logo"></img>
      </div>
      <div className = "MainHeader-icons">
        <button><img src={searchIcon} alt="search-icon"></img></button>
        <button>
        <img src={notificationIcon} alt="notification-icon"></img>
        </button>
        <button>
        <img src={settingsIcon} alt="settings-icon"></img>
        </button>
        <button>
        <img src={profilePic} alt="Profile-Pic"></img>
        </button>
        
      </div>
    </div>
  );
}

export default MainHeader;