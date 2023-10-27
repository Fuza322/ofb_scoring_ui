import {AppActionsType} from './store';

const setAppLanguageActionType = 'APP-SET-LANGUAGE';

export type LanguageType = {name: 'English', value: 'En'} | {name: 'Russian', value: 'Ru'} | {name: 'Uzbek', value: 'Uz'}

export type InitialStateType = {
  language: LanguageType
}

const initialState: InitialStateType = {
  language: {name: 'Russian', value: 'Ru'},
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case setAppLanguageActionType:
      return {...state, language: action.language};
    default:
      return state;
  }
};

// actions
export const setAppLanguageAC = (language: LanguageType) => (
    {type: setAppLanguageActionType, language: language} as const);

// types
export type AppReducerActionsType = ReturnType<typeof setAppLanguageAC>
