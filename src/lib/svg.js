import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
  <svg viewBox="0 257 50 50" preserveAspectRatio="xMinYMin meet">
    <path d="M.11-2H376c-.005 204.081-.005 306.134 0 290.158-95.114 42-135-1-188-6.789C98.06 266.778 61.482 346.402.11 262.41-.037 251.212-.037 163.075.11-2z" style="stroke: none; fill:orange;"></path>
  </svg>
`;

export default () => <SvgXml xml={xml} width="100%" height="50" />;