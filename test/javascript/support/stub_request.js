import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

const stub_request = (fetchStub, { url, options, responseData }) => {
  const response = new Response;
  sinon.stub(response, 'json')
    .returnsPromise()
    .resolves(responseData);

  fetchStub
    .withArgs(url, options)
    .returnsPromise()
    .resolves(response);
};

export default stub_request;