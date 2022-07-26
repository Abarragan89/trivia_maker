import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TEMP_USER, ADD_USER } from '../../utils/mutations';
import { QUERY_TEMP_USER } from '../../utils/queries';
import { useState } from 'react';
import './confirmUser.css'

function ConfirmUser() {
    const [hasVerified, setHasVerified] = useState(false)

    const userId = useParams().id

    const { data: newUserInfo } = useQuery(QUERY_TEMP_USER, {
        variables: { id: userId },
    });
    const userCredentials = newUserInfo?.tempUser || '';
    // Set user credentials
    console.log(userCredentials)
    const [addUser] = useMutation(ADD_USER);

    const [deleteUser, {data: deleteData}] = useMutation(DELETE_TEMP_USER);

    async function verifyUser () {
        await deleteUser({variables: { id: userId }})
        setHasVerified(!hasVerified)
    }
    const isDeleted = deleteData?.deleteTempUser.deletedCount || '';    

    async function addUserConfirmation () {
        try{
            await addUser({
            variables: { ...userCredentials },
        });   
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <>
            {!hasVerified && 
            <button className="verify-user" onClick={verifyUser}>Click here to verify</button>
            }
            {isDeleted && hasVerified &&
                <div id="div-to-activate">
                    <p className='confirmation-message'>Your account has been activated!</p>
                    <Link  className="verify-user"  onClick={addUserConfirmation} to="/login">Click here to login</Link>
                </div>
            }
            {hasVerified && !isDeleted &&  
            <>
            <p className='confirmation-message'>Can't register this user, please try again</p>
            <Link className="verify-user" to="/login">Back to Sign up</Link>

            </>
            }  
        </>
    )
}

export default ConfirmUser;