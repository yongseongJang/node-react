import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export { shallow, mount, render } from 'enzyme';
export default Enzyme;
