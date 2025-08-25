
import './App.css'
import { useState, useEffect } from 'react';


function App() {
    return ( <div> 
      <Counter/>
    </div>)
}


function Counter() {

  const [count , setCount] = useState(0) ;
  const [quote , setQuote] = useState('') ;

  useEffect(() => {

    const timer = setInterval(() => {
        setCount(prev => prev + 1) ;
    }, 6000);
    return ()=> clearInterval(timer);
  } 

  ,[]) ;

   useEffect(() => {
    async function fetchQuote() {
        try {
            const res = await fetch('https://v2.jokeapi.dev/joke/Any');
            const data = await res.json();

            if (data.type === "single") {
                setQuote(data.joke);
            } 
            else if (data.type === "twopart") {
                setQuote(`${data.setup} — ${data.delivery}`);
            } 
            else {
                setQuote("No joke found!");
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            setQuote('Failed to fetch quote');
        }
    }
    fetchQuote();
}, [count]);



  return (  
     <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>
  <button  style={{width:400, height:400 , display: 'flex' , justifyContent:'center' , alignItems:'center'}}  onClick={()=> setCount(count + 1)}>
       <p style={{fontSize:60 , fontWeight:400}}> {count} </p>
  </button>
  <p>{quote}</p>
  </div>
  )

}


export default App
