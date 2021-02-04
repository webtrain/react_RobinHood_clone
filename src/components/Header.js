import React from 'react';
import Logo from '../img/robinhood.svg';
import SearchIcon from '@material-ui/icons/Search';


const Header = () => {
  const openMenu = (e) => {
    e.currentTarget.classList.toggle('open');
    document.querySelector('.header__menuItems').classList.toggle('show');
    if(document.body.style.overflowY === '') {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  };

  return (
    <div className="header">
      <div className="header__logo">
        <img src={Logo} alt="" width={25} />
      </div>

      <div className="header__menu" onClick={openMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="header__searchContainer">
        <div className="header__search">
          <SearchIcon className="header__search__icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header__menuItems">
        <ul>
          <a href="#">Free Stocks</a>
          <a href="#">Potfolio</a>
          <a href="#">Cash</a>
          <a href="#">Messages</a>
          <a href="#">Account</a>
        </ul>
      </div>
    </div>
  );
};

export default Header;
