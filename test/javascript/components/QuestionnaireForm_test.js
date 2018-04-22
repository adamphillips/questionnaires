require('../test_helper');
const assert = require('assert');

import React from 'react';
import { mount } from 'enzyme';

import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

import QuestionnaireForm from '../../../app/javascript/components/QuestionnaireForm';

describe('<QuestionnaireForm />', () => {
  it('should have an input label for each question', () => {
    const wrapper = mount(<QuestionnaireForm />);

    wrapper.setState({
      title: 'Some form',
      questions: [
        { label: 'First question', name: 'question_1' },
        { label: 'Second question', name: 'question_2' }
      ]
    });

    assert.equal(wrapper.find('input#title[value="Some form"]').length, 1);
    assert.equal(wrapper.find('input#question_1[value="First question"]').length, 1);
    assert.equal(wrapper.find('input#question_2[value="Second question"]').length, 1);
  });

  it('should update the state when the name changes', () => {
    const wrapper = mount(<QuestionnaireForm />);

    wrapper.setState({
      title: 'Some form',
      question: []
    });

    wrapper.find('input#title').simulate('change', {target: {value: 'Super form'}});

    const newState = wrapper.state();
    assert.equal(newState.title, 'Super form');
  });

  it('should update the state when a question title changes', () => {
    const wrapper = mount(<QuestionnaireForm />);

    wrapper.setState({
      title: 'Some form',
      questions: [
        { label: 'First question', name: 'question_1' },
        { label: 'Second question', name: 'question_2' },
        { label: 'Third question', name: 'question_3' }
      ]
    });

    wrapper.find('input#question_2').simulate('change', {target: {value: 'Question number 2'}});

    const newState = wrapper.state();
    assert.equal(newState.questions[1].label, 'Question number 2');
  });

  it('should add a new empty question when the Add question link is clicked', () => {
    const wrapper = mount(<QuestionnaireForm />);

    wrapper.setState({
      title: 'Some form',
      questions: [
        { label: 'First question', name: 'question_1' }
      ]
    });

    wrapper.find('.addQuestionLink').simulate('click');

    assert.equal(2, wrapper.state().questions.length);
    assert.equal('', wrapper.state().questions[1].label);
  });

  describe('validation', () => {
    it('should add an error when a question name is not unique', () => {
      const wrapper = mount(<QuestionnaireForm />);

      wrapper.setState({
        title: 'Some form',
        questions: [
          { label: 'First question', name: 'question_1' },
          { label: 'Dupe first question', name: 'question_2' },
          { label: 'Third question', name: 'question_3' }
        ]
      });

      wrapper.find('input#question_name_2').simulate('change', {target: {value: 'question_1'}});

      assert.equal(undefined, wrapper.state().questions[0].error);
      assert.equal('Duplicate question name question_1', wrapper.state().questions[1].error);
      assert.equal(undefined, wrapper.state().questions[2].error);
    });
  });

  describe('saving the form', () => {
    beforeEach(() => {
      this.fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      this.fetchStub.restore();
    });

    it('should submit the current questionnaire data to the endpoint', () => {
      const wrapper = mount(<QuestionnaireForm />);

      const formState = {
        title: 'Some form',
        questions: [
          { label: 'First question', name: 'question_1' }
        ]
      };

      wrapper.setState(formState);

      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify({questionnaire: formState}),
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': 'some-csrf-token'
        }),
        credentials: 'same-origin'
      };

      const successResponse = {
        result: {
          message: 'Questionnaire created'
        },
        record: {
          ...formState,
          id: 123,
        }
      };

      const response = new Response;
      sinon.stub(response, 'json')
        .returnsPromise()
        .resolves(successResponse);

      this.fetchStub
        .withArgs('/api/questionnaires', expectedOptions)
        .returnsPromise()
        .resolves(response);

      wrapper.find('form').simulate('submit');

      assert.equal('Questionnaire created', wrapper.state().success);
      assert.equal(123, wrapper.state().id);
    });
  });
});