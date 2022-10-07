const baseUrl = 'http://localhost:3000';

export function userLogin(...resArgs) {
  const body = resArgs[0];
  return (dispatch, getState) => {
    dispatch({ type: 'loadingSubmit/true' });
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        return response;
      })
      .catch(err => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: 'loadingSubmit/false' });
        }, 250);
      });
  }
}

export function fetchProducts() {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/products`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        dispatch({
          type: 'products/fetchSuccess',
          payload: data
        })
      })
  }

}
