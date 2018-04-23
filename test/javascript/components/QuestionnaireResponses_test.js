require('../test_helper');
const assert = require('assert');

import React from 'react';
import { mount } from 'enzyme';

import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

import stub_request from '../support/stub_request';

import QuestionnaireResponses from '../../../app/javascript/components/QuestionnaireResponses';

describe('<QuestionnaireResponses />', () => {
  beforeEach(() => {
    this.fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    this.fetchStub.restore();
  });

  it ('should load the questionnaires', () => {
    const response1 = {
      id: 1,
      person_name: 'Adam 1',
      created_at: '12:34',
      answers: {
        question_1: {
          question: 'Question 1.1',
          answer: 'Answer 1.1'
        },
        question_2: {
          question: 'Question 1.2',
          answer: 'Answer 1.2'
        }
      }
    };

    const response2 = {
      id: 2,
      person_name: 'Adam 2',
      created_at: '01:23',
      answers: {
        question_1: {
          question: 'Question 2.1',
          answer: 'Answer 2.1'
        },
        question_2: {
          question: 'Question 2.2',
          answer: 'Answer 2.2'
        }
      }
    };

    stub_request(
      this.fetchStub,
      {
        url: '/api/questionnaires/1',
        options: {},
        responseData: {
          id: 1,
          title: 'Some questionnaire',
          questionnaire_responses: [response1, response2]
        }
      }
    );

    const wrapper = mount(<QuestionnaireResponses id={1} />);

    const heading = wrapper.find('h1');

    assert.equal('Some questionnaire', heading.text());

    const responseLinks = wrapper.find('.response-link');

    assert.equal(2, responseLinks.length);

    assert.equal('Adam 1', responseLinks.at(0).text());
    assert.equal('Adam 2', responseLinks.at(1).text());

    responseLinks.at(0).simulate('click');

    assert.equal(response1, wrapper.state().currentResponse);

    responseLinks.at(1).simulate('click');
    assert.equal(response2, wrapper.state().currentResponse);
  });
});