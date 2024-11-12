import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/components/Root.tsx';
import { EnvUnsupported } from '@/components/EnvUnsupported.tsx';
import { init } from '@/init.ts';
import { BrowserRouter } from "react-router-dom";
import AlertStore from './components/store/AlertStore.tsx';
import Alerting from './components/blocks/Alerting/Alerting.tsx';
import './i18n';

import '@/styles/Base.css';
import '@/styles/Colors.css';
import '@/styles/Defaults.css';
import '@/styles/Fonts.css';
import '@/styles/Reset.css';
// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';

// import { config } from 'dotenv'
// config()

const root = ReactDOM.createRoot(document.getElementById('root')!);

export const Context = createContext(null as any)

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

  root.render(
    <BrowserRouter> 
        <Context.Provider value={{
            Alert: new AlertStore()
        }}>
            <Root/>
            <Alerting />
        </Context.Provider>
    </BrowserRouter>  
  );
} catch (e) {
  root.render(<EnvUnsupported/>);
}
