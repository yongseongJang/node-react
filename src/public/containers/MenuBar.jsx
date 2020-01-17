import React,{ Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ButtonDropdown, Button} from 'reactstrap';
import '../styles/MenuBar.css';

class MenuBar extends Component{
    constructor(props){
        super(props);

        const dropdownOpen = new Map();
        dropdownOpen.set("View",false);
        dropdownOpen.set("Properties",false);
        dropdownOpen.set("Filter",false);
        dropdownOpen.set("Sort",false);
        dropdownOpen.set("New",false);
        
        this.state = {
            dropdownOpen
        }
        
        this.toggle = this.toggle.bind(this);
    }

    toggle(item){
        const dropdownOpen = this.state.dropdownOpen;
        dropdownOpen.set(item,!dropdownOpen.get(item));
        this.setState((prevState) => (Object.assign({},prevState,{dropdownOpen})));
    }

    render(){
        return(
                <div className="MenuBar">
                    <div className="LeftMenu">
                        <Dropdown className="MenuBar__Dropdown" isOpen={this.state.dropdownOpen.get('View')} toggle={() => this.toggle('View')}>
                            <DropdownToggle caret color="white" className="MenuBar__Dropdown__DropdownToggle">View</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="RightMenu">
                        <Dropdown className="MenuBar__Dropdown" isOpen={this.state.dropdownOpen.get('Properties')} toggle={() => this.toggle('Properties')}>
                            <DropdownToggle color="white" className="MenuBar__Dropdown__DropdownToggle">Properties</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown className="MenuBar__Dropdown" isOpen={this.state.dropdownOpen.get('Filter')} toggle={() => this.toggle('Filter')}>
                            <DropdownToggle color="white" className="MenuBar__Dropdown__DropdownToggle">Filter</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown className="MenuBar__Dropdown" isOpen={this.state.dropdownOpen.get('Sort')} toggle={() => this.toggle('Sort')}>
                            <DropdownToggle color="while" className="MenuBar__Dropdown__DropdownToggle">Sort</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>  
                        <ButtonDropdown className="MenuBar__ButtonDropdown" isOpen={this.state.dropdownOpen.get('New')} toggle={() => this.toggle('New')}>
                            <Button color="primary" className="MenuBar__ButtonDropdown__Button">New</Button>
                            <DropdownToggle caret color="primary" className="MenuBar__ButtonDropdown__DropdownToggle"/>
                            <DropdownMenu>
                                <DropdownItem>
                                </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                </div>
        )
    }
}

export default MenuBar;
