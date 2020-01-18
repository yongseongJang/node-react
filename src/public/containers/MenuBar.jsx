import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Button,
} from 'reactstrap';
import '../styles/MenuBar.css';

class MenuBar extends Component {
  state = {
    isViewMenuOpen: false,
    isPropertiesMenuOpen: false,
    isFilterMenuOpen: false,
    isSortMenuOpen: false,
    isNewMenuOpen: false,
  };

  viewToggle = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, {
        isViewMenuOpen: !prevState.isViewMenuOpen,
      }),
    );
  };

  propertiesToggle = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, {
        isPropertiesMenuOpen: !prevState.isPropertiesMenuOpen,
      }),
    );
  };

  filterToggle = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, { isFilterOpen: !prevState.isFilterOpen }),
    );
  };

  sortToggle = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, { isSortToggle: !prevState.isSortToggle }),
    );
  };

  newToggle = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, { isNewToggle: !prevState.isNewToggle }),
    );
  };

  render() {
    return (
      <div className="MenuBar">
        <div className="LeftMenu">
          <Dropdown
            className="MenuBar__Dropdown"
            isOpen={this.state.isViewMenuOpen}
            toggle={() => this.viewToggle}
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
            isOpen={this.state.isPropertiesMenuOpen}
            toggle={() => this.propertiesToggle}
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
            isOpen={this.state.isFilterMenuOpen}
            toggle={() => this.filterToggle}
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
            isOpen={this.state.isSortMenuOpen}
            toggle={() => this.sortToggle}
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
            isOpen={this.state.isNewMenuOpen}
            toggle={() => this.newToggle}
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
  }
}

export default MenuBar;
