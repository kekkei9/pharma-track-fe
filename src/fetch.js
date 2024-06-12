const Fetch = async (
  method = "GET",
  url = "",
  data = undefined,
  message = 'Hệ thống',
  headers = undefined
) => {
  let opts = {
    redirect: "follow",
    referrerPolicy: "no-referrer",
    mode: 'cors',
    method
  };

  // if (headers) {
  //   opts.headers = {
  //     ...headers,
  //     "content-Type": "application/json",
  //   };
  // }

  if (data) {
    // opts.headers = {
    //   // ...opts.headers,
    //   "content-Type": "application/json",
    // }
    if(method === 'GET') {
      url += '?' + new URLSearchParams(data).toString()
    } else {
      opts.body = JSON.stringify(data)
    }
  }
  // if (headers) {
  //   opts.headers = {
  //     ...headers,
  //     "content-Type": "application/json",
  //   };
  // }

  //  for no-cors 
  // const response = await fetch(url, opts);
  // const string = await response.text();
  // const json = string === "" ? {} : JSON.parse(string);
  // return json;
  
  const response = await fetch(url, opts)
  return response.json()
};

export default Fetch;