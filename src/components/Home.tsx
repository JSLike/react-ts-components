import React from 'react';

interface IHello {
    message?: string
}

const Home: React.FC<IHello> = (props) => {
    return(
        <div>
            <h2>1{props.message}</h2>
            <h2>2{props.children}</h2>
        </div>
        )


}
Home.defaultProps={
    message:'asdasdadas'
}

export default Home
