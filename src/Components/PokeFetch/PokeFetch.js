import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor(props) { // sets defaults
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      count: 10,
      revealAnswer: false,
      timerOn: false,
    }
  }

  fetchPokemon() {
    console.log('fetchPokemon')
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  timer = () => {
    console.log('timer')
    const { startCount } = this.props
    this.setState({
      count: startCount
    })

    this.setState({
      myInterval: setInterval(() => {
        if (this.state.count > 0) {
          this.setState({
            count: this.state.count - 1
          })
        } else {
          this.setState({
            revealAnswer: true
          })
        }
      }, 1000)
    })

  }

  guessPoke = () => {
    console.log('guessPok')
    clearInterval(this.state.myInterval)
    this.timer()
    this.fetchPokemon()
  }

  render() { // returns the things
    console.log('render')

    const { count } = this.state
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.guessPoke()}>Start!</button>
        <h1 className={'timer'} >Timer Display: {count}</h1>
        <div className={'pokeWrap'}>
          <img className={this.state.revealAnswer ? 'pokeImg2' : 'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={this.state.revealAnswer ? 'pokeName2' : 'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevState) {
    console.log('componentDidUpdate')
    if (this.state.count === 0) {
      clearInterval(this.myInterval)
    }
  }

  componentDidMount() { // call backend code / api code

  }



  componentWillUnmount() { //

  }

}

export default PokeFetch;