export const LOGIN_SUCESS = 'LOGIN_SUCESS';
export const CURRENT_SUCCESS = 'CURRENT_SUCCESS';
export const CURRENT_FAIL = 'CURRENT_FAIL';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_STATE = 'REMOVE_STATE';

export const loginSuccess = (email, password) => ({
  type: LOGIN_SUCESS,
  email,
  password,
});

export const searchCurrentSucess = (data) => ({
  type: CURRENT_SUCCESS,
  data,
});

export const searchCurrentError = (error) => ({
  type: CURRENT_FAIL,
  error,
});

export const removeState = (data) => ({
  type: REMOVE_STATE,
  payload: data,
});

export const addItem = (info, data) => ({
  type: ADD_ITEM,
  payload: {
    id: info.id,
    value: info.value,
    description: info.description,
    currency: info.currency,
    method: info.method,
    tag: info.tag,
    exchangeRates: data,
  },
});
export function fetchApi() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data);
      const filterCurrencies = currencies.filter((curr) => curr !== 'USDT');
      dispatch(searchCurrentSucess(filterCurrencies));
    } catch (error) {
      dispatch(searchError(error));
    }
  };
}

export function fetchApiExpenses(info) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(addItem(info, data));
    } catch (error) {
      dispatch(searchError(error));
    }
  };
}
