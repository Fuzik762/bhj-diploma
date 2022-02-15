/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  let url;
  let method;
  let data;
  if(options.method) {
    data = Object.entries(options.data);
    method = options.method;
    if(method === 'GET') {
      url = options.url + '?';
      for ([key, value] of data) {
        url += key + '=' + value + '&';
      }
    }
    if(method === 'POST') {
      formData = new FormData;
      url = options.url;
      for ([key, value] of data) {
        formData.append( key, value );
      }
    }
  }


  xhr.responseType = 'json';
  
  try {
    xhr.open( method, url );
    xhr.addEventListener('readystatechange',function(){
        if(this.readyState == xhr.DONE){
          callback = (err, response) => {
            if (response && response.user) {
              this.setCurrent(response.user);
            }
            callback(err, response);
          }
        }
      });
        
    xhr.send( method === 'GET' ? {} : formData );
  } catch (error) {
    console.log(error);
  }
}
