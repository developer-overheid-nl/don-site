import { type ReactNode } from 'react';

import styles from './styles.module.css';

export default function SiteLogo(): ReactNode {
  return (
    <svg className={styles.logo} aria-label='Vignet' viewBox="0 0 92 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={styles.rsaquo} fillRule="evenodd" clipRule="evenodd" d="M26.718 33.2523L0 7.9528L7.15601 0L42.1354 33.3897L34.5678 40.6854L34.5678 40.6853L7.95278 66.783L0.400269 58.8302L26.718 33.2523Z" fill="Currentcolor"/>
        <path className={styles.lowbar} d="M91.0191 64.7855H40.1378V74.7284H91.0191V64.7855Z" fill="CurrentColor"/>
    </svg>
  )
}
