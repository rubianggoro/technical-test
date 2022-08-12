import {
    GET_DATA_BEGIN,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
    GET_POKEMON_DETAIL,
    POKEMON_DETAIL,
    ADD_MY_POKEMON,
    DELETE_MY_POKEMON
  } from "../Actions/Action";
  
  const initState = {
    data: [],
    error: null,
    isLoading: false,
    dataPokemonDetail: {},
    dataMyPokemon: []
  };
  
  const getPokemon = (state = initState, action) => {
    switch (action.type) {
      case GET_DATA_BEGIN:
        return {
          ...state,
          isLoading: true,
        };

      case GET_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.result,
        };

      case GET_DATA_FAILED:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };

      case GET_POKEMON_DETAIL:
        return {
          ...state,
          isLoading: true,
        };

      case POKEMON_DETAIL:
        return {
          ...state,
          isLoading: false,
          dataPokemonDetail: action.result,
        };

      case ADD_MY_POKEMON:
        return {
          ...state,
          dataMyPokemon: [...state.dataMyPokemon, action.result]
        };

      case DELETE_MY_POKEMON:
        const dataMyPokemon = [
          ...state.dataMyPokemon.slice(0, action.index),
          ...state.dataMyPokemon.slice(action.index + 1)
        ]
        return {
          ...state,
          dataMyPokemon
        }
  
      default:
        return state;
    }
  };
  export default getPokemon;