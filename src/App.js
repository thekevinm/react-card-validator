import React, { Component } from 'react'
import './App.css'
import valid from 'card-validator'

class App extends Component {
  state = {
    cardNum: '',
    name: '',
    exp: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

    var numberValidation = valid.number(e.value);

    if (!numberValidation.isPoteniallyValid) {
      console.log('Invalid card num')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    console.log(this.state)
  }

  render() {
    return (
    <div>

      <form onSubmit={this.handleSubmit}>
      <div className="cardContainer">
        <div className="cardImg">
        <img id="imgSize" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png" />
        </div>
        <div className="numInput">
          <input onChange={this.handleChange} value={this.state.cardNum} name="cardNum"id="cardNumInput" type="tel" placeholder="&#9900;&#9900;&#9900;&#9900; &#9900;&#9900;&#9900;&#9900; &#9900;&#9900;&#9900;&#9900; &#9900;&#9900;&#9900;&#9900;" readOnly />
        </div>
        <div className="nameInput">
          <input onChange={this.handleChange} value={this.state.name} name="name" id="cardNameInput" type="text" placeholder="Name" readOnly />
          <input onChange={this.handleChange} value={this.state.exp} name="exp" id="cardNameInput" type="text" placeholder="valid thru &#9900;&#9900;/&#9900;&#9900;" readOnly />
        </div>
      </div>

      <div className="inputContainer">
        <div className="numRealInput">
          <input onChange={this.handleChange}value={this.state.cardNum} name="cardNum" id="cardRealInput" type="tel" placeholder="Card Number" />
          <input onChange={this.handleChange} value={this.state.name} name="name" id="cardRealInput" type="tel" placeholder="Full Name" />
          <input onChange={this.handleChange} value={this.state.exp} name="exp"id="cardRealInput" type="tel" placeholder="MM/YY" />
          <button type="submit">Submit</button>
        </div>
      </div>
      </form>

    </div>
    )
  }
}

export default App;
