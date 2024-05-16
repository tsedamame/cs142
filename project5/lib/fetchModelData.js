function fetchModel(url) {
  return new Promise(function(resolve, reject) {
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", url);
    httpReq.onreadystatechange = function() {
      if (httpReq.readyState === 4) {
        if (httpReq.status === 200) {
          var responseObject = JSON.parse(httpReq.responseText);
          resolve({ data: responseObject });
        } else {
          reject({
            status: httpReq.status,
            statusText: httpReq.statusText,
          });
        }
      }
    };
    httpReq.send();
  });
}

export default fetchModel;
