import React from 'react';
import './Vote.css';

const Vote = (props) => {

    const voteByNumber = async (num) => {
        await fetch('https://number-votes-api.herokuapp.com/vote', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({number: num}) // body data type must match "Content-Type" header
          })
          .then(response => response.json())
          .then(()=>{
            props.getData();
            props.closeModal();
          }).catch(err => console.log(err));

    }

    return (
        <div className="Vote">
            {[1,2,3,4,5,6,7,8,9].map(num=>(
                <button id="number" key={num} onClick={() => voteByNumber(num)}>{num}</button>
            ))}
            <button id="close" onClick={props.closeModal}>Cancel</button>
        </div>
    );
}
export default Vote;