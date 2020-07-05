import React, {useState, useEffect,useRef,useContext} from 'react';
import './LikeButtonCss.scss'
import {myContext} from '../App'
const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0);
    const likeStatus=useRef(10)
    const boolRef=useRef(false)
    const defaultValue=useContext(myContext)

    useEffect(() => {
        console.log('defaultValue---',defaultValue)

        console.log('likeStatus---',likeStatus)
        console.log('document title effect is running');
        document.title = `点击了${like}次`;
    }, [like])

    useEffect(()=>{
        if (boolRef.current){
        }else{
            boolRef.current=true
        }
        console.log('boolRef.current',boolRef.current)

    })

    // let num:number=0
    // function setLocal():string{
    //     let num:number;
    //     let localValue:string |null=localStorage.getItem('value')
    //     if (localValue){
    //         localStorage.setItem('value',`${Number(localValue)+1}`)
    //     }else{
    //         localStorage.setItem('value',`0`)
    //
    //     }
    //     return localValue as string
    // }


    function handleAlertClick(){
        console.log('出发了弹窗函数')
        setTimeout(()=>{
            setLike(like+1)

            alert(`like is ${like} now,${likeStatus.current}`)
        },3000)
    }
    return (
        <div className={"like-button"}>
            {/*<button onClick={()=>{setLike(like+1)}}>*/}
            {/*    {like}*/}
            {/*    /!*{console.log('num--',setLocal(),num)}*!/*/}
            {/*</button>*/}

            <button onClick={()=>{setLike(like+1);likeStatus.current++}}>
                {like+'  '+likeStatus.current}
                点击改变like
                {/*{console.log('num--',setLocal(),num)}*/}
            </button>
            <button onClick={handleAlertClick}>点击弹窗</button>
        </div>
    )
}
export default LikeButton;
