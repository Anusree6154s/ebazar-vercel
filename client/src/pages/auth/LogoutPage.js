import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutsAsync } from "../../redux";

function LogoutPage() {
    const user = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(signOutsAsync())
    }, [dispatch])

    return (
        <>
            {!user && <Navigate to='/' replace={true}/>}
        </>
    );
}

export default LogoutPage;