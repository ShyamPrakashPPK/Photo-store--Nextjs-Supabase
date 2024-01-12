'use client'
import React, { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

import { useRouter } from "next/navigation"


export default function AuthForm() {
    const [isNewUser, setIsNewUser] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isSigningUp, setIsSigningUp] = useState(false)

    const router = useRouter()


    async function handleLogin(e: any) {
        e.preventDefault();
        setIsSigningIn(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email, password
        })
        console.log({ error, data })
        if (!error) {
            router.push('/photos')
        } else {
            setIsSigningIn(false)
        }
    }

    async function handleSignUp(e: any) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })
        if (!error) {
            setIsSigningUp(true)
        }
        console.log({data,error});
        
    }

    let signInMessage = 'Sign In';

    if (isSigningIn) {
        signInMessage = 'Signing In'
    } else if (isNewUser) {
        signInMessage = 'Sign Up'
    }

    let signUpMessage = <p className="text-center text-white">Email sent! check your email to confirm sign up.</p>


    if (isSigningIn) {
        signInMessage = 'Signing In'
    } else if (isNewUser) {
        signInMessage = 'Sign Up'
    }


    return (
        <div>
            <form onSubmit={isNewUser ? handleSignUp : handleLogin} className="space-y-8" >
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email Address'
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type='submit'>
                    {signInMessage}
                </button>
                <p className="text-center text-white">
                    {
                        isNewUser ? (
                            <>
                                Already have an account? {' '}
                                <button
                                    onClick={() => setIsNewUser(false)}
                                    type='button'
                                    className="text-indigo-400 hover:text-indigo-600"

                                >
                                    Sign In
                                </button>
                            </>
                        ) : (
                            <>
                                Don’t have an account?{' '}
                                <button
                                    type='button'
                                    onClick={() => setIsNewUser(true)}
                                    className="text-indigo-400 hover:text-indigo-600"

                                >
                                    Sign Up
                                </button>
                            </>
                        )
                    }
                </p>
                {
                    isSigningUp && signUpMessage
                }
            </form>
        </div>
    )
}