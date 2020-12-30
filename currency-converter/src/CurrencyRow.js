import React from 'react'

function CurrencyRow(props) {
    const{
        currencyOptions,
        selectCurrency,
        onChangeCurrency,
        onChangeamt,
        amt
    } = props

    return (
        <div>
            <input type = "number" className = "input" value = {amt} onChange = {onChangeamt}></input>
            <select value = {selectCurrency} onChange = {onChangeCurrency} >
                {currencyOptions.map(option => (
                    <option value = {option} key = {option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default CurrencyRow
