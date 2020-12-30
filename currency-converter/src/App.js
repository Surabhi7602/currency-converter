import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {

  const [currencyOptions, setCurrencyOtions] = useState([])
  const [fromCurrency, setfromCurrency] = useState()
  const [toCurrency, settoCurrency] = useState()
  const [amt, setamt] = useState(1)
  const[exrate, setexrate] = useState()
  const [amtInFromCurrency, setamtInFromCurrency] = useState(true)

  let toAmount , fromAmount

  if (amtInFromCurrency){
    fromAmount =amt
    toAmount = amt*exrate
  }
  else{
    toAmount =amt
    fromAmount =amt/exrate
  }
  

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        
      setCurrencyOtions([data.base, ...Object.keys(data.rates)])
      setfromCurrency(data.base)
      settoCurrency(Object.keys(data.rates)[11])
      setexrate(data.rates[Object.keys(data.rates)[11]])
      
      })
  },[])

  useEffect(() => {if (fromCurrency != null && toCurrency != null)
    {fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setexrate(data.rates[toCurrency]))

  }}, [fromCurrency, toCurrency]
  )

  function handlefromamtchange(e){
    setamt (e.target.value)
    setamtInFromCurrency(true)
  }

  function handletoamtchange(e){
    setamt (e.target.value)
    setamtInFromCurrency(false)
  }

  return (
    <div>
      <h1>CURRENCY CONVERTER</h1>
      < CurrencyRow currencyOptions = {currencyOptions}
      selectCurrency = {fromCurrency}
      onChangeCurrency = {e => setfromCurrency(e.target.value)}
      onChangeamt = {handlefromamtchange}
      amt = {fromAmount}
      />
      <div><h1>=</h1></div>
      < CurrencyRow currencyOptions = {currencyOptions} 
      selectCurrency = {toCurrency}
      onChangeCurrency = {e => settoCurrency(e.target.value)}
      onChangeamt = {handletoamtchange}
      amt = {fromAmount}
      amt = {toAmount}
      />
    </div>
  );
}

export default App;
