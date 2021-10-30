import React from 'react';
import {ToggleSwitch} from '../lib/toggle-switch';

const Switch = ({value, color, onChange}) =>
  <ToggleSwitch
    isOn={value}
    onColor={color}
    offColor="#DDE3E7"
    label=""
    labelStyle={{ color: "black", fontWeight: "900" }}
    size="medium"
    onToggle={onChange}
  />
export default Switch;