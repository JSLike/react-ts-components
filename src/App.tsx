import React,{useContext} from 'react';
import './App.css';
import LikeButton from "./components/LikeButton";
import {log} from "util";
interface IContext{
    myName:string,
    myAge:number
}
let num=1;
if(num==1){
    
};
let defaultValue:IContext={
    myName:'Like',
    myAge:19921
}
export const myContext=React.createContext(defaultValue)
function App() {
    const AMyContext=useContext(myContext)

    const onContextValue=():void=>{
        console.log('get app myContext---',myContext,AMyContext)
    }
    return (
        <div className={"App"}>
            <myContext.Provider value={{myName:'is default value properties',myAge:111}}>
                <h1>这是app主页面</h1>
                {/*<Home />*/}
                <LikeButton/>
                <button onClick={onContextValue}>App的button | 点击获取context-value</button>
            </myContext.Provider>

        </div>
    );
}

export default App;
