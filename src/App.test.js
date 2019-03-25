import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';
import Homepage from './Homepage'

configure({adapter: new Adapter()});

describe('>>>Layout --- Test',()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('>>>Layout --- Test',()=>{
  it("should render my component", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.length).toEqual(1)
  });
});
/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should render my component", () => {
  const wrapper = shallow(<Homepage />);
  expect(wrapper.length).toEqual(1)
});*/
