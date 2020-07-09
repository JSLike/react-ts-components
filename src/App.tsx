import React from 'react';
import './App.scss';
import './styles/index.scss'
import Button, {ButtonSize, ButtonType} from './components/Button/Button'

function App() {
    return (
        <div className={"App"}>
            <h1>App page</h1>

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
    );
}

export default App;
