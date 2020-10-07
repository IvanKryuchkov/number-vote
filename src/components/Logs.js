import React, { useState } from 'react';
import './Logo.css';

const Logs = () => {

    const [logs, setLogs] = useState([]);
    const getLogs = async () => {
        await fetch('https://number-votes-api.herokuapp.com/logs', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
          })
          .then(response => response.json())
          .then((response)=>{
              setLogs(response);
          }).catch(err => console.log(err));
    }

    return (
        <div>
            <button onClick={getLogs}>Get logs</button>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Url</th>
                    <th>JSON</th>
                </tr>
            {logs.map(log=>(
            <tr>
                <th>{log.date}</th>
                <th>{log.url}</th>
                <th>{JSON.stringify(log.json, null, 2)}</th>                     
            </tr>  
            ))}
            </table>
        </div>
    );
}
export default Logs;