import './index.scss';
import {useState, useEffect} from 'react';

function PokemonCard({pokeData}) {

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(undefined);
  const [pokemonType, setPokemonType] = useState(undefined);
  const [show, setShow] = useState(false);
  const [pokeColours, setPokeColours] = useState({
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  });

  useEffect(()=>{
    const getPokemon = async ()=>{
      fetch(pokeData.url).then(res=> res.json())
      .then(data =>{
        setPokemon(data);
        setPokemonType(data.types[0].type.name);
      })
    }
    getPokemon();
  },[])

  useEffect(()=>{
    if(pokeData){
      setShow(pokeData.show);
    }
  },[pokeData?.show])

  function ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
  
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
  
    return rgb;
  }

  function capFirstLetter(str){
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  function getPercent(stat, val){
    if(stat === 'hp'){
      return (val*100)/255;
    }else if(stat === 'attack'){
      return (val*100)/190;
    }else if(stat === 'defense'){
      return (val*100)/250;
    }else if(stat === 'special-attack'){
      return (val*100)/194;
    }else if(stat === 'special-defense'){
      return (val*100)/250;
    }else if(stat === 'speed'){
      return (val*100)/200;
    }
  }

  if(!pokeData || !pokeData.show){
    return null;
  }
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="card-front" style={{backgroundColor:pokeColours[pokemon?.types[0]?.type?.name]}}>
            <div className="image-container" 
            style={{
              backgroundColor: ColorLuminance(pokeColours[pokemon?.types[0]?.type?.name],0.5),
              }}>
              <img src={pokemon?.sprites?.other['official-artwork']?.front_default} onLoad={()=>{setLoading(false)}}></img>
            </div>
            <div className="text-style">
              <span className='id'>#{ capFirstLetter(String(pokemon?.id)) }</span>
            </div>
            <div className="text-style">
              <span>{ capFirstLetter(pokemon?.name) }</span>
            </div>
            <div className="text-style">
              <span>{ capFirstLetter(pokemon?.types[0]?.type?.name) }</span>
            </div>
          </div>
          <div className="card-back">
            <div className="stats">
            {pokemon?.stats?.map((stat, key)=>{
              return (
                  <div key={key} className="stat">
                    <span className='stat-name'>{ capFirstLetter(stat?.stat?.name) }</span>
                      <div className="progress-wrapper">
                        <div className="progress-bar" 
                        style={{width: `${getPercent(stat?.stat?.name, stat?.base_stat)}%`}}
                        >
                        </div>
                      </div>
                    <span>{stat.base_stat}</span>
                  </div>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
