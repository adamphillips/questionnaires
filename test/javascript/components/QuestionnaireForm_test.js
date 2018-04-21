require('../test_helper');
const assert = require('assert');

import React from 'react';
import { shallow } from 'enzyme';

import QuestionnaireForm from '../../../app/javascript/components/QuestionnaireForm';

describe('<QuestionnaireForm />', () => {
  it('contains the expected markup', () => {
    const wrapper = shallow(<QuestionnaireForm />);
    assert.equal(wrapper.find('.form').length, 1);
  });
});