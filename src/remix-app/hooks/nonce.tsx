import { createContext, useContext } from 'react';

const NonceContext = createContext<string | undefined>(undefined);
const NonceProvider = NonceContext.Provider;
const useNonce = () => useContext(NonceContext);

export default NonceProvider;
export { NonceContext, useNonce };
