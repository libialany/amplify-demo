import logo from './main.png';
/* src/App.js */
import React, { useEffect, useState } from 'react'
import  Amplify,{ API, graphqlOperation } from 'aws-amplify'
import awsExports from './aws-exports';
import  { updateDogi } from './graphql/mutations';
import  { getDogi } from './graphql/queries';
import './App.css';
Amplify.configure(awsExports);
function App() {
  useEffect(() => {
    fetchDogePrice()
  }, [])
  const [dogiPrice, setDogiPrice] = useState(0);
  async function fetchDogePrice() {
    
      
try {
  const dogiData=await API.graphql(graphqlOperation(getDogi))
  const dogiPrice = dogiData.data.getDogi.price
} catch (error) {
  console.log(error);
}
    
  }
 

  async function updateDogiPrice(){
    try{ 
      const dogiData=await API.graphql(graphqlOperation(getDogi))
      const dogiPrice=dogiData.data.getDogi.price+0.5

      const updatedDogiPrice=await API.graphql(graphqlOperation(updateDogi,{input: dogiPrice}))

      setDogiPrice(updatedDogiPrice.data.updateDogi.price)
    }
    catch(err){
      console.log('error fetching todos')
      console.log(err)
    } 
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dogi Coin Price Predictor</h1>
        <p>One click = 50 centavos</p>
        <span className="text-color-secondary">$ {dogiPrice}</span>
        <button onClick={updateDogiPrice}>Dogi 🚀</button>
      <img src={logo} width={459} height={384} >
      </img>
      </header>
    </div>
  );
}

export default App;
