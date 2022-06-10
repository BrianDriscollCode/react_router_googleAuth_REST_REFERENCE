import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode' 
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions" 

const GoogleAuth = ( {signIn, signOut} ) => {

    const [isSignedIn, setIsSignedIn] = useState(false) 
    const [userName, setUserName] = useState('t');

    const handleCallbackResponse = async (response) => {
        console.log("Encoded JWT ID token: " + response.credential)
        let userObject = jwt_decode(response.credential)
        console.log(userObject)

        handleSignIn()
        
    }

    const handleSignIn = async () => {

        await setIsSignedIn(true)
        truePrint()

    }

    const truePrint = () => {

        console.log(isSignedIn)
    }

    const handleSignOut = async () => {

        await setIsSignedIn(false)
        console.log(isSignedIn)

    }

    // useEffect(() => {

    //     if (isSignedIn) {
    //         signIn()
    //     } else {
    //         signOut()
    //     }
        

    // }, [isSignedIn])

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "546006948673-1su64h1ii5f2cq5e2m8ou37b1pg4cn3j.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large"}
        )

    }, [])    

   

        return (

            <div>
                {
                    
                isSignedIn ?
                <div> {`${userName} is signed in`} 
                        <button className="ui red google button" onClick={handleSignOut}>
                            <i className='google icon' />
                            sign out 
                        </button> 
                </div>: <div id="signInDiv"></div>

                }

                {console.log('test')}
                 

            </div>
           

        )

}

export default connect(null, {signIn, signOut})(GoogleAuth)