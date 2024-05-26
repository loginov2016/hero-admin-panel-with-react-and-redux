import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/App';
import store from './store';
import p from '../lib/print';
import './styles/index.scss';

p('state: ', store.getState());

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}><App/></Provider>);