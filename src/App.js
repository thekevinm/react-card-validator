import React, { Component } from 'react'
import './App.css'
import valid from 'card-validator'
import glamorous from 'glamorous'

const BorderColor = glamorous.div(
{
  border:'2px solid black',
  width: '400px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin:'auto',
  marginTop: '20px',
  backgroundColor: 'silver',
  alignItems: 'center',
  borderRadius: '25px'
},
(props) => ({
  border: error(props.val)
})
)

const error = (check) => {
  if(check === false) {
    return '2px solid red'
  } else if (check === true){
    return '2px solid green'
  }
}



class App extends Component {
  state = {
    cardNum: '',
    name: '',
    expMonth: '',
    expYear: '',
    cardType: '',
    cardImg: '',
    isValid: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCardNumberChange = ({target}) => {

    this.setState({
      [target.name]: target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
    })
    var numberValidation = valid.number(target.value);

    if (!numberValidation.isPotentiallyValid) {
  console.log("Invalid Number")
  this.setState({
    cardType: '',
    isValid: false
  })
}

else if (numberValidation.card) {
  console.log(numberValidation.card.niceType);
  this.setState({
    cardType: numberValidation.card.niceType,
    isValid: true
  })
  if (this.state.cardType === 'Visa') {
    this.setState({
      cardImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png"
    })
  } else if (this.state.cardType === 'Discover') {
    this.setState({
      cardImg: "https://securecdn.pymnts.com/wp-content/uploads/2014/03/Discover-logo-e1416429693676.jpg"
    }) 
  }else if (this.state.cardType === 'Mastercard') {
    this.setState({
      cardImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2000px-MasterCard_Logo.svg.png"
    }) 
  }else if (this.state.cardType === 'American Express') {
    this.setState({
      cardImg: "https://paymentweek.com/wp-content/uploads/2015/10/American-Express-copy.png"
    }) 
  }else if (this.state.cardType === 'Diners Club') {
    this.setState({
      cardImg: "https://www.headforpoints.com/wp-content/uploads/2016/06/Diners-Club-350-350x200.jpg"
    }) 
  }else if (this.state.cardType === 'JCB') {
    this.setState({
      cardImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1200px-JCB_logo.svg.png"
    }) 
  }else if (this.state.cardType === 'UnionPay') {
    this.setState({
      cardImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png"
    }) 
  }else if (this.state.cardType === 'Maestro') {
    this.setState({
      cardImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Maestro_1992_logo.svg/2000px-Maestro_1992_logo.svg.png"
    })
  }
  }
  }

  handleExpMonthChange = ({target}) => {
    this.setState({
      [target.name]: target.value
    })
    var monthValidation = valid.expirationMonth(target.value)

    if(!monthValidation.isPotentiallyValid) {
      console.log("Invalid Month")
      this.setState({
        isValid: false
      })
    }
    else if (monthValidation.card) {
      console.log("Valid Month")
      this.setState({
        expMonth: target.value,
        isValid: true
      })
    }
  }

  handleExpYearChange = ({target}) => {
    this.setState({
      [target.name]: target.value
    })
    var yearValidation = valid.expirationDate(target.value);

    if (!yearValidation.isPotentiallyValid) {
      console.log('Invalid Year')
      this.setState({
        isValid: false
      })
    }
    else if (yearValidation.card) {
      console.log('Valid Year')
      this.setState({
        expYear: target.value,
        isValid: true
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.isValid === true){
    console.log(this.state)
  } else {
    alert("Fix Errors please :D")
    window.location.reload()
  }
  }

  render() {
    return (
    <div>

      <form onSubmit={this.handleSubmit}>
      <div className="cardContainer">
      <BorderColor type={this.state.cardType} val={this.state.isValid} background-color="silver" className="card">
        <div className="cardImg">
        <img id="imgSize" src={this.state.cardImg} alt= '' />
        </div>
        <div className="numInput">
          <input value={this.state.cardNum} name="cardNum"id="cardNumInput" type="tel" placeholder="&#9900;&#9900;&#9900;&#9900; &#9900;&#9900;&#9900;&#9900; &#9900;&#9900;&#9900;&#9900; &#9900;&#9900;&#9900;&#9900;" readOnly />
        </div>
        <div className="nameInput">
          <input value={this.state.name} name="name" id="cardNameInput" type="text" placeholder="Name" readOnly />
          <p>valid thru</p><input value={this.state.expMonth} name="expMonth" id="cardExpInput" type="text" placeholder="&#9900;&#9900;" readOnly /><p>/</p>
            <input value={this.state.expYear} name="expYear" id="cardExpInput" type="text" placeholder="&#9900;&#9900;" readOnly />
        </div>
        </BorderColor>
      </div>

      <div className="inputContainer">
        <div className="numRealInput">

          <input 
          onKeyUp={this.handleCardNumberChange} 
          onChange={this.handleChange} 
          value={this.state.cardNum} 
          name="cardNum" 
          id="cardRealInput" 
          type="tel" 
          placeholder="Card Number" />
          
          <input 
          onChange={this.handleChange} 
          value={this.state.name} 
          name="name" 
          id="cardRealInput" 
          type="tel" 
          placeholder="Full Name" />
          
          <input 
          onKeyUp={this.handleExpMonthChange}
          onChange={this.handleChange} 
          value={this.state.expMonth} 
          name="expMonth"
          id="cardRealInput" 
          type="tel" 
          placeholder="MM" />

          <input 
          onKeyUp={this.handleExpYearChange}
          onChange={this.handleChange} 
          value={this.state.expYear} 
          name="expYear"
          id="cardRealInput" 
          type="tel" 
          placeholder="YR" />

          <button type="submit">Submit</button>

        </div>
      </div>
      </form>

    </div>
    )
  }
}

export default App;
