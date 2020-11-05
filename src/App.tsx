import React from 'react';
import './App.scss';
import './styles/index.scss'
import Button, {ButtonSize, ButtonType} from './components/Button/Button'
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from './components/Icon/Icon';
import {library} from '@fortawesome/fontawesome-svg-core';
import { fas} from '@fortawesome/free-solid-svg-icons';
library.add( fas);
function App() {

    return (
        <div className={"App"}>
            <h1>App page</h1>
            <div className="item">
                <Icon icon="arrow-down" theme="warning" size={'4x'}/>
            </div>
            <div className="item">
                <Menu defaultIndex={'0'} onSelect={(index)=>{
                    console.log('---index---',index)
                }}
                mode={"horizontal"} defaultOpenSubMenus={['1']}
                >
                    <MenuItem >
                        cool link 1
                    </MenuItem>
                    <SubMenu title={'子标题'}>
                        <MenuItem>
                            cool link 2
                        </MenuItem>
                        <MenuItem>
                            cool link 3
                        </MenuItem>
                    </SubMenu>
                    <MenuItem>
                        cool link 4
                    </MenuItem>
                    <MenuItem>
                        cool link 5
                    </MenuItem>
                    <MenuItem  disabled={true}>
                        cool link 13
                    </MenuItem>
                </Menu>
            </div>
            <div className="item">
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}
                        onFocus={() => true} className={'aaaa asdasd'}
                >
                    默认button
                </Button>

                <Button btnType={ButtonType.Danger} size={ButtonSize.Small}
                >
                    danger
                </Button>

                <Button btnType={ButtonType.Link} href={'https://www.baidu.com'} disabled
                >
                    button-link
                </Button>

                <Button btnType={ButtonType.Link} href={''}
                >
                    link
                </Button>

                <Button disabled={true}>禁用标志</Button>
                <div>
                    boolean默认值
                </div>
            </div>

        </div>
    );
}

export default App;
