import React, {useState} from 'react';
import './App.scss';
import './styles/index.scss'
import Button, {ButtonSize, ButtonType} from './components/Button/Button'
import Alert, {AlertType} from './components/Alert/Alert'
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {


    let [alertShow, changeAlertShow] = useState(false)

    const showAlert = () => {
        changeAlertShow(true)
        let timer = setTimeout(() => {
            changeAlertShow(false)
            clearTimeout(timer)
        }, 3000)
    }
    const closeAlert = () => {
        changeAlertShow(false)

    }


    return (
        <div className={"App"}>
            <h1>App page</h1>
            <div>
                <Menu defaultIndex={0} onSelect={(index)=>{console.log('index',index)}}>
                    <MenuItem index={0}>
                        cool link 1
                    </MenuItem>
                    <MenuItem index={1} >
                        cool link 2
                    </MenuItem>
                    <MenuItem index={2} disabled={true}>
                        cool link 13
                    </MenuItem>
                </Menu>
            </div>
            <div>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}
                        onFocus={() => true} className={'aaaa asdasd'}
                >默认button</Button>

                <Button btnType={ButtonType.Danger} size={ButtonSize.Small}
                >danger</Button>

                <Button btnType={ButtonType.Link} href={'https://www.baidu.com'} disabled
                >button-link</Button>

                <Button btnType={ButtonType.Link} href={''}
                >link</Button>

                <Button disabled={true}>禁用标志</Button>
                <div>
                    boolean默认值
                </div>
            </div>
            <div>
                <button onClick={showAlert}>点击召唤弹窗</button>
                <Alert title={'标题'} isShow={alertShow} hasClose={true} alertType={AlertType.Success} click={closeAlert}>
                    <div>这是内容</div>
                </Alert>
            </div>


        </div>
    );
}

export default App;
