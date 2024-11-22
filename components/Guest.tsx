import { SignInButton } from '@clerk/nextjs'
import React from 'react'

export default function Guest() {
  return (
    <div className="guest">
        <h1>Welcome</h1>
        <p>Please sign in to manage your transactions</p>
        <SignInButton />
    </div>
  )
}
