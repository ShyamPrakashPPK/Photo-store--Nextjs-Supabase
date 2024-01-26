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
        console.log({ data, error });

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
            <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1f1f1f] via-[#292929] to-[#1b1b1b] rounded-lg shadow-lg p-6 w-full ">
                <h2 className="mt-10 mx-5 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-800 via-sky-600 to-sky-100 bg-clip-text text-transparent text-5xl font-extrabold mb-4 text-center">Welcome to Photo Store</h2>
                <p className="mb-10 text-xl font-light text-center">
                    Sign in to upload and save your favorite photos.
                </p>

                <form onSubmit={isNewUser ? handleSignUp : handleLogin} className="space-y-6 mb-10" >
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
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-800 via-sky-600 to-sky-100 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type='submit'>
                        {signInMessage}
                    </button>

                   

                    
                    <p className="text-center text-white mb-10 ">
                        {
                            isNewUser ? (
                                <>
                                    Already have an account? {' '}
                                    <button
                                        onClick={() => setIsNewUser(false)}
                                        type='button'
                                        className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-800 via-sky-600 to-sky-100 hover:text-indigo-600"

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


        </div>
    )
}