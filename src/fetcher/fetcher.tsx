export const domainName = "http://localhost:8080/";

const doGet = async (url: string) => {
  const promise = await fetch(`${domainName + url}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (promise.status >= 200 && promise.status <= 300) {
    if (promise.headers.get('Content-Type') === 'application/json') {
      return await promise.json();
    } else {
      throw new Error("Incorrect response from the server!");
    }
  } else {
    throw new Error(promise.statusText);
  }
}

const doPost = async (url: string, body = {}) => {
  const promise = await fetch(`${domainName + url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });

  if (promise.status >= 200 && promise.status <= 300) {
    if (promise.headers.get('Content-Type') === 'application/json') {
      return await promise.json();
    } else {
      throw new Error("Incorrect response from the server!");
    }
  } else {
    throw new Error(promise.statusText);
  }
}

export {doGet, doPost};