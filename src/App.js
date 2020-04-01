import React, { Component } from 'react';
import './App.css';
import './Scanlines.css';

class App extends Component {
  constructor() {
    super();


    let pokemon = {
      sprites: {
        front_default: ""
      },
      name: "",
      id: "",
      flavorText: ""
    }

    this.state = {
        pokemon: pokemon,
        flavorText: "",
        dex: 0
    }

  }

  siftThroughEntries = textEntries =>
  {

    for(let i=0;i< textEntries.length;i++)
    {
         if(textEntries[i].language.name === "en")
            {   
                this.setState({
                  flavorText: textEntries[i].flavor_text
                });
                // console.log(this.state)
                break;
            }
    }
  }

  componentDidMount = () =>
  {
    let baseURL = "https://pokeapi.co/api/v2/";
    let endpoint = "pokemon/"
    let firstPokemon = "151";

    fetch(`${baseURL}${endpoint}${firstPokemon}`)
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        this.setState( { 
          pokemon: res, 
          flavorText: "",
          dex: res.id
        });
    })

    endpoint = "pokemon-species/"
    fetch(`${baseURL}${endpoint}${firstPokemon}`)
    .then(res => res.json())
    .then(res => { 
      // this.state.pokemon.flavorTex

      // console.log(res.flavor_text_entries);
      // this.setState( { flavorText: res.flavor_text_entries} )
      this.siftThroughEntries(res.flavor_text_entries);

    })


  }

  getPreviousPokemon = event => {
    
    let dex = event.target.getAttribute("data-dex");
    let baseURL = "https://pokeapi.co/api/v2/";
    let endpoint = "pokemon/"

    fetch(`${baseURL}${endpoint}${dex}`)
    .then(res => res.json())
    .then(res => {
      
        endpoint = "pokemon-species/";
        let data = res;

        fetch(`${baseURL}${endpoint}${dex}`)
        .then(res2 => res2.json())
        .then(res2 => {

          this.setState( {
            pokemon: data,
            dex: res.id
          })
          this.siftThroughEntries(res2.flavor_text_entries);

        })
      
    })

  }

  getNextPokemon = event => {

    let dex = event.target.getAttribute("data-dex");
    let baseURL = "https://pokeapi.co/api/v2/";
    let endpoint = "pokemon/"

    fetch(`${baseURL}${endpoint}${dex}`)
    .then(res => res.json())
    .then(res => {
      
        endpoint = "pokemon-species/";
        let data = res;

        fetch(`${baseURL}${endpoint}${dex}`)
        .then(res2 => res2.json())
        .then(res2 => {

          this.setState( {
            pokemon: data,
            dex: res.id
          })
          this.siftThroughEntries(res2.flavor_text_entries);

        })
      
    })

  }
  

  render(){

      let prev = parseInt(this.state.dex) - 1;
      let next = parseInt(this.state.dex) + 1;
      
      if(prev === 0) prev = 251;
      if(next > 251) next = 1;




      return (
        <div className="App">
          <header className="App-header">
            Pokemon Slider
          </header>

         
          <div className="response-container ">
        
            <div className="flex-arrow-left"><a href="#" onClick={this.getPreviousPokemon} data-dex={prev} className="link">&lt;</a></div>
            <div className="sprite-container scanlines">
            <div className="name">
                {this.state.pokemon.name} 
                <div className="right">No. {this.state.dex} &nbsp; H:{this.state.pokemon.height} &nbsp; W: {this.state.pokemon.weight}</div> 
            </div>
              
              <div className="sprite-bg-container">
            <img src={this.state.pokemon.sprites.front_default} className="sprite" />
            </div>
            
            <div className="flavorText-container">{this.state.flavorText}</div>
            </div>
            
            <div className="flex-arrow-right"><a href="#" onClick={this.getNextPokemon} data-dex={next} className="link">&gt;</a></div>
          </div>

          
        </div>
      );
  }
}

export default App;
