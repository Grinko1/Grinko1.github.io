import React from 'react';
import Store from '.';

/**
 * Контекст для Store
 * @type {React.Context<Store>}
 */
const defaultValue= {}
export const StoreContext = React.createContext(defaultValue);
