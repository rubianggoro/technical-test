import axios from "axios";

export const GET_DATA_BEGIN = "GET_DATA_BEGIN";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const POKEMON_DETAIL = "POKEMON_DETAIL";

export const ADD_MY_POKEMON = "ADD_MY_POKEMON";

export const DELETE_MY_POKEMON = "DELETE_MY_POKEMON";

// Pokemon List
export const getDataBegin = () => {
  return {
    type: GET_DATA_BEGIN,
  };
};

export const getDataSuccess = (result) => {
  return {
    type: GET_DATA_SUCCESS,
    result,
  };
};

export const getDataFailed = (error) => {
  return {
    type: GET_DATA_FAILED,
    error,
  };
};

export const getPokemonList = () => {
  return (dispatch) => {
    dispatch(getDataBegin());

    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((result) => dispatch(getDataSuccess(result.data)))
      .catch((error) => dispatch(getDataFailed(error.massage)));
  };
};

export const getPokemonListWithParams = (url) => {
  return (dispatch) => {
    dispatch(getDataBegin());

    axios
      .get(url)
      .then((result) => dispatch(getDataSuccess(result.data)))
      .catch((error) => dispatch(getDataFailed(error.massage)));
  };
};

// Pokemon Detail

export const getPokemonDetail = () => {
  return {
    type: GET_POKEMON_DETAIL,
  };
};

export const dataPokemonDetail = (result) => {
  return {
    type: POKEMON_DETAIL,
    result,
  };
};

export const fetchPokemonDetail = (id) => {
  return (dispatch) => {
    dispatch(getPokemonDetail()); 
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((result) => dispatch(dataPokemonDetail(result.data)))
      .catch((error) => dispatch(getDataFailed(error.massage)));
  };
};

// MyPokemonlist
export const addMyPokemon = (val) => {
  return {
    type: ADD_MY_POKEMON,
    result: val
  };
};

// Delete data MyPokemon
export const deleteMyPokemon = (index) => {
  return {
    type: DELETE_MY_POKEMON,
    index
  };
};