import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Button,
} from 'reactstrap';
import '../styles/MenuBar.css';

const MenuBar = () => {
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [isPropertiesMenuOpen, setIsPropertiesMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);

  const viewToggle = () => {
    setIsViewMenuOpen(!isViewMenuOpen);
  };

  const propertiesToggle = () => {
    setIsPropertiesMenuOpen(!isPropertiesMenuOpen);
  };

  const filterToggle = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const sortToggle = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
  };

  const newToggle = () => {
    setIsNewMenuOpen(!isNewMenuOpen);
  };

  return (
    <div className="MenuBar">
      <div className="LeftMenu">
        <Dropdown
          className="MenuBar__Dropdown"
          isOpen={isViewMenuOpen}
          toggle={() => viewToggle()}
        >
          <DropdownToggle
            caret
            color="white"
            className="MenuBar__Dropdown__DropdownToggle"
          >
            View
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="RightMenu">
        <Dropdown
          className="MenuBar__Dropdown"
          isOpen={isPropertiesMenuOpen}
          toggle={() => propertiesToggle()}
        >
          <DropdownToggle
            color="white"
            className="MenuBar__Dropdown__DropdownToggle"
          >
            Properties
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          className="MenuBar__Dropdown"
          isOpen={isFilterMenuOpen}
          toggle={() => filterToggle()}
        >
          <DropdownToggle
            color="white"
            className="MenuBar__Dropdown__DropdownToggle"
          >
            Filter
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          className="MenuBar__Dropdown"
          isOpen={isSortMenuOpen}
          toggle={() => sortToggle()}
        >
          <DropdownToggle
            color="while"
            className="MenuBar__Dropdown__DropdownToggle"
          >
            Sort
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ButtonDropdown
          className="MenuBar__ButtonDropdown"
          isOpen={isNewMenuOpen}
          toggle={() => newToggle()}
        >
          <Button color="primary" className="MenuBar__ButtonDropdown__Button">
            New
          </Button>
          <DropdownToggle
            caret
            color="primary"
            className="MenuBar__ButtonDropdown__DropdownToggle"
          />
          <DropdownMenu>
            <DropdownItem></DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    </div>
  );
};

export default MenuBar;
