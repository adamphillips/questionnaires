require('../test_helper');
const assert = require('assert');

import React from 'react';
import { mount } from 'enzyme';

import QuestionnaireForm from '../../../app/javascript/components/QuestionnaireForm';

describe('<QuestionnaireForm />', () => {
  it('should have an input label for each question', () => {
    const wrapper = mount(<QuestionnaireForm />);

    wrapper.setState({
      title: 'Some form',
      questions: [
        { label: 'First question' },
        { label: 'Second question' }
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
        { label: 'First question' },
        { label: 'Second question' },
        { label: 'Third question' }
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
        { label: 'First question' }
      ]
    });

    wrapper.find('.addQuestionLink').simulate('click');

    assert.equal(2, wrapper.state().questions.length);
    assert.equal('', wrapper.state().questions[1].label);
  });
});