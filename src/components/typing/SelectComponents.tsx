import { TYPING_CONSTANTS, WORD_LENGTH_OPTIONS, BASE_KPM_OPTIONS } from '../../constants/typing';
import React from 'react';

export function SelectTypeLength(props: {onSelect: (value: string) => void, disabled: boolean}) {
  return (
    <select onChange={(e) => props.onSelect(e.target.value)} disabled={props.disabled} defaultValue={TYPING_CONSTANTS.DEFAULT_WORD_LENGTH.toString()}>
      {WORD_LENGTH_OPTIONS.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

export function SelectBaseSpeed(props: {onSelect: (value: string) => void, disabled: boolean}) {
  return (
    <select onChange={(e) => props.onSelect(e.target.value)} disabled={props.disabled} defaultValue={TYPING_CONSTANTS.DEFAULT_BASE_KPM.toString()}>
      {BASE_KPM_OPTIONS.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
} 