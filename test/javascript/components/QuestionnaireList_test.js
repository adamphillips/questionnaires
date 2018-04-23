require('../test_helper');
const assert = require('assert');

import React from 'react';
import { mount } from 'enzyme';

import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

import stub_request from '../support/stub_request';

import QuestionnaireList from '../../../app/javascript/components/QuestionnaireList';

import { BrowserRouter } from 'react-router-dom'

describe('<QuestionnaireList />', () => {
  beforeEach(() => {
    this.fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    this.fetchStub.restore();
  });

  it ('should load the questionnaires', () => {
    stub_request(
      this.fetchStub,
      {
        url: '/api/questionnaires',
        options: {},
        responseData: {
          questionnaires: [
            {
              id: 1,
              title: 'Questionnaire1'
            },
            {
              id: 2,
              title: 'Questionnaire2'
            }
          ]
        }
      }
    );

    const wrapper = mount(<BrowserRouter><QuestionnaireList /></BrowserRouter>);

    assert.equal(wrapper.find('a[href="/admin/questionnaires/1"]').length, 1);
    assert.equal(wrapper.find('a[href="/admin/questionnaires/2"]').length, 1);
  });
});