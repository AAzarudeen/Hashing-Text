import React from 'react';

function Info(props) {
    return (
        <div style={{
            border: '1px solid black',
            margin: 'auto',marginTop:'20px', width: '90%', padding: '10px', fontSize: '15px',
        }}>

            <p> Input : {props.input}</p>
            <p> Hash Value : {props.hash} </p>
            <p> Algo : {props.algo} </p>

        </div>

    )
}
export default Info;