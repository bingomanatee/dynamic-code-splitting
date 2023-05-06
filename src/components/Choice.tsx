'use client';
import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './Choice.module.css'

let RedPillComponent = null;
let BluePillComponent = null;

function Loading() {
  return <code>Loading ...</code>
}

export function Choice() {
  const [choice, choose] = useState<string | null>(null);


  if (choice === 'red') {
    if (!RedPillComponent) {
      RedPillComponent = dynamic(() => import('./RedPill'),
        {
          suspense: true
        })
    }
  }

  if (choice === 'blue') {
    if (!BluePillComponent) {
      BluePillComponent = dynamic(() => import('./BluePill'),
        {
          suspense: true
        }
      )
    }
  }

  return (
    <main className={styles.main}>
      <h1>Code Splitting</h1>

      <p>Do you want to choose the blue pill or the red pill?</p>

      {!choice ? <section className={styles.choice}>
        <div>
          <h2>Blue Pill</h2>
          <button onClick={(() => choose('blue'))}>Choose</button>
        </div>
        <div>
          <h2>Red Pill</h2>
          <button onClick={(() => choose('red'))}>Choose</button>
        </div>
      </section> : null}
      {choice === 'red' ? <Suspense fallback={<Loading/>}><RedPillComponent/></Suspense> : null}
      {choice === 'blue' ? <Suspense fallback={<Loading/>}><BluePillComponent/></Suspense> : null}
    </main>
  )
}
