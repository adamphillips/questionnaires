import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

require('isomorphic-fetch');

// ensure jsdom window contains csrf token
const head = document.querySelectorAll('head')[0];
head.insertAdjacentHTML('beforeend', '<meta name="csrf-token" content="some-csrf-token" />');
