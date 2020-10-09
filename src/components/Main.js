import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Vote from './Vote';
import Modal from 'react-modal';
import './Main.css';

const Main = () => {

    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
      setIsOpen(true);
    }
    function closeModal(){
      setIsOpen(false);
    }
  
    const [numData, setNumData] = useState([]);
    const [query, setQuery] = useState('2020-10-05');
    const [url, setUrl] = useState(
      'https://number-votes-api.herokuapp.com/statistic?date=2020-10-05'
    );
  
    useEffect(()=> {
      getData();
    }, [url]);
  
    const getData = async () => {
      await fetch(url, {
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
      .then(response => setNumData(response))
      .then(response=>{
        console.log(response);
      }).catch(err => console.log(err));
    }
    return (
        <div>
          <p>Enter data (e.g. "2020-10-05")</p>
          <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}        
          />
          <button onClick={() => {setUrl(`https://number-votes-api.herokuapp.com/statistic?date=${query}`)}}>Get votes</button>
          <button onClick={openModal}>Vote</button>
          <Modal
            className="Modal"
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <Vote closeModal={closeModal} getData={getData}/>
          </Modal>
          { 
            numData.length==0 ? 
            <div>No data</div> 
            :
            <PieChart 
            className="Chart"
            center={[150, 110]}
            viewBoxSize={[300,300]}
            segmentsShift={2}
            radius={100}
            lineWidth={90}
            data = {numData.map(num => (
              { title:num._id, value:num.count, color: `#${num.count > 9 ? Math.floor(Math.random() * 10)+'F' : num.count+'0'}F`}
            ))} 
            label = {( data ) => `${data.dataEntry.title}(${Math.round(data.dataEntry.percentage)}%)`}
            labelPosition = {70}
            />
        }
        </div>
    );

}

export default Main;