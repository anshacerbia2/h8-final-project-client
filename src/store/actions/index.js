const baseUrl = "http://localhost:3001";

export function userLogin(...resArgs) {
  const body = resArgs[0];
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/login`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function fetchUser() {
  const { id } = localStorage.getItem("user");
  return (dispatch, getState) => {
    fetch(`${baseUrl}/users/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "user/userSuccess",
          payload: data,
        });
      });
  };
}

export function fetchProducts() {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });
    return fetch(`${baseUrl}/products`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "products/fetchSuccess",
          payload: data,
        });
        return data;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 1000);
      });
  };
}

export function userRegister(...resArgs) {
  const body = resArgs[0];
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/register`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

// export function userLogin(...resArgs) {
//   const body = resArgs[0];
//   return (dispatch, getState) => {
//     dispatch({ type: 'loadingSubmit/true' });
//     return fetch(`${baseUrl}/login`, {
//       method: 'POST',
//       mode: 'cors',
//       body: JSON.stringify(body),
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then((response) => {
//         return response;
//       })
//       .catch(err => {
//         return err;
//       })
//       .finally(() => {
//         setTimeout(() => {
//           dispatch({ type: 'loadingSubmit/false' });
//         }, 250);
//       });
//   }
// }

export function fetchCategories() {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/categories`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "categories/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchSubCategories() {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });
    return fetch(`${baseUrl}/sub-categories`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "subCategories/fetchSuccess",
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 500);
      });
  };
}

export function fetchSubCategory(id) {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });
    fetch(`${baseUrl}/sub-categories/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "subCategory/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 500);
      });
  };
}

// export function fetchProducts() {
//   return (dispatch, getState) => {
//     dispatch({ type: 'loading/true' });
//     fetch(`${baseUrl}/products`)
//       .then((response) => {
//         console.log(response);
//         return response.json()
//       })
//       .then((data) => {
//         dispatch({
//           type: 'products/fetchSuccess',
//           payload: data
//         })
//       })
//       .catch(err => {
//         console.log(err);
//       })
//       .finally(() => {
//         setTimeout(() => {
//           dispatch({ type: 'loading/false' });
//         }, 500);
//       });
//   }
// }

export function fetchProduct(id) {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });
    fetch(`${baseUrl}/products/${id}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "product/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 500);
      });
  };
}

export function postSubCategory(...resArgs) {
  const body = resArgs[0];
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/sub-categories`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function postProduct(...resArgs) {
  const body = resArgs[0];
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/products`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function putSubCategory(...resArgs) {
  const access_token = localStorage.getItem("access_token");
  const body = resArgs[0];
  const id = resArgs[1].id;
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/sub-categories/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function putProduct(...resArgs) {
  const access_token = localStorage.getItem("access_token");
  const body = resArgs[0];
  const id = resArgs[1].id;
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/products/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function deleteProduct(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/products/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };
}

export function fetchProvinces() {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/provinces`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "provinces/fetchSuccess",
          payload: data,
        });
      });
  };
}

export function fetchCities(provinceId) {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/cities/${provinceId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "cities/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
