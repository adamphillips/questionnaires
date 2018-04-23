const csrf_token = () => {
  let result;
  try{
    result = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content');
  } catch(error) {
    result = 'no-csrf-token-found';
  }
  return result;
};

export default csrf_token;