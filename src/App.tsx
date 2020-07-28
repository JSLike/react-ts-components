import React, {useState} from 'react';
import './App.scss';
import './styles/index.scss'
import Button, {ButtonSize, ButtonType} from './components/Button/Button'
import Alert,{AlertType} from './components/Alert/Alert'

function App() {

    let [alertShow,changeAlertShow]=useState(false)
    return (
        <div className={"App"}>
            <h1>App page</h1>

            <div>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}
                        onFocus={()=>true}
                >默认button</Button>

                <Button btnType={ButtonType.Danger} size={ButtonSize.Small}
                >danger</Button>

                <Button btnType={ButtonType.Link}  href={'https://www.baidu.com'} disabled
                >button-link</Button>

                <Button btnType={ButtonType.Link}  href={''}
                >link</Button>

                <Button disabled={true}>禁用标志</Button>
                <div>
                    boolean默认值
                </div>
            </div>
            <div>
                <button onClick={()=>changeAlertShow(true)}>点击召唤弹窗</button>
                <button onClick={()=>changeAlertShow(true)}>点击召唤弹窗</button>
                <Alert title={'标题'} isShow={alertShow} hasClose={true} alertType={AlertType.Warning} click={()=>changeAlertShow(false)}>
                    <div>这是内容</div>
                </Alert>
            </div>
        </div>
    );
}

export default App;
