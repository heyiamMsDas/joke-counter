
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
  const [loading , setLoading] = useState(false) ;

  useEffect(() => {

    const timer = setInterval(() => {
        setCount(prev => prev + 1) ;
    }, 8000);
    return ()=> clearInterval(timer);
  } 

  ,[]) ;

   useEffect(() => {
    async function fetchQuote() {
        setLoading(true) ;
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
        }
        catch (error) {
            console.error('Error fetching quote:', error);
            setQuote('Failed to fetch quote');
        }
        finally {
            setLoading(false) ;
        }

    }
    fetchQuote();
}, [count]);



  return (  
      <div>
     <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>
  <button  style={{width:400, height:400 , display: 'flex' , justifyContent:'center' , alignItems:'center'}}  onClick={()=> setCount(count + 1)}>
       <p style={{fontSize:60 , fontWeight:400}}> {count} </p>
  </button>
    </div>
 <p style={{fontSize:20 , backgroundColor:'#f7e499ff' , color:'black'}}>{ loading ? "Loading...": quote }</p>
  </div>

  )

}


export default App
