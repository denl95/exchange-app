import * as React from 'react';
import styles from './Header.scss';
import classNames from 'classnames';

class Header extends React.PureComponent {
  public render() {
    return (
      <div
        className = {classNames(
          styles.header,
          'd-flex align-items-center py-4 justify-content-center font-weight-bold',
        )}
      >
        Your exchange rate application
      </div>
    );
  }
}

export default Header;
