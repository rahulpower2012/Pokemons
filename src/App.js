import './App.scss';
import React, {useState, useEffect, Suspense} from 'react';
import PlaceHolder from './components/placeholder';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const PokemonCard = React.lazy(() => import('./components/pokemon-card/index.js'));

function App() {

  const [PokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [done, setDone] = useState(false);

  const [currPokemonList, setCurrPokemonList] = useState([]);
  const [ searchString, setSearchString ] = useState('');
  const [pokemonLength, setPokemonLength] = useState(0);
  const [strPrev, setStrPrev] = useState('');
  const [timeOutid, setTimeOutid] = useState(null);
  const [signedIn, setSignedIn] = useState(false);



  const responseGoogle = (response) => {
    if(response.accessToken){
      setSignedIn(true);
    }
  }

  const clientId = "156479564931-i8t3u41sf35kv22b7orbnd8mprlucf1o.apps.googleusercontent.com";



  useEffect(()=>{
    getList();
        window.addEventListener('scroll', scrollHandler);
  },[])

  const searchStringHandler = (e) => {
    setSearchString(e.target.value);
  }

  useEffect(()=>{
    if(done){
      window.removeEventListener('scroll', scrollHandler);
    }
  },[done])

  useEffect(()=>{

    const timeOutidNext = setTimeout(()=>{


      let count = 0;
    if(searchString ==''){

      PokemonList.map(pokemon => {
        if(pokemon){
          pokemon.show = true;
          count = count+1;
        }
      })
    }else{
      PokemonList.map(pokemon => {
        if(!pokemon.name.toLowerCase().includes(searchString.toLowerCase())){
          pokemon.show = false;
        }else{
          pokemon.show = true;
          count = count+1;
        }
      })

      
    }

    if((count<limit && strPrev!==searchString) || (count<limit && pokemonLength<PokemonList.length)){
      
      fetchMeMore();
    }
    
    setStrPrev(searchString);
    setPokemonLength(PokemonList.length);



    }, 2000);

    clearTimeout(timeOutid);
    setTimeOutid(timeOutidNext);
    
  }, [searchString, PokemonList])

  const getList = async ()=>{
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(res=> res.json())
    .then(data =>{
      setPokemonList(()=>{
        if(data.results.length === 0){
          
          setDone(true);
          return PokemonList;
        }
        data.results.map(pokemon => {
          pokemon.show = false;
        })
        return [...PokemonList, ...data.results];
      })
    });
    if(limit===10){
      setOffset(offset+10);
      setLimit(6);
    }else{
      setOffset(offset+6);
    }
  }

  const scrollHandler = () =>{
    if((Math.ceil(window.innerHeight + document.documentElement.scrollTop) != document.documentElement.offsetHeight) 
        || loading
        ){
            if(!done){
        setLoading(true);
      }
    }
  }

  useEffect(()=>{
    if(!loading || done){
      return;
    }else{
      fetchMeMore();
    }
  },[loading]);

  const fetchMeMore = async () =>{
    await getList();
    setLoading(false);
  };

    if(!signedIn) {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Pokemon Search</h2>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            prompt="select_account"
            onAutoLoadFinished={true}
          />
        </div>
      </div>
    );
  }


  return (
    <div className="App">
      <div className="search-box">
        <div className='search-input'>
          <input placeholder="Search for a Pokemon" onChange={searchStringHandler} />
        </div>
      </div>
        <div className="cards">
        {
        PokemonList.map((pokemon,key)=>(
          <Suspense key={key} fallback={<PlaceHolder/>}>
            {/* { (pokemon.show !==false? true: false) &&
            <PokemonCard key={key} pokeData = {pokemon}/>
            } */}
            <PokemonCard key={key} pokeData = {pokemon}/>
          </Suspense>
        )) }
        </div>
        { !done && <PlaceHolder/>}
    </div>
  );
}

export default App;
