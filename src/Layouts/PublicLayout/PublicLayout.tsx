import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "../../store/store";

export type PropsType = {
    children: ReactNode;
}

function NotAuthorizedLayout(props: PropsType) {
    const isAuth = useSelector((state: RootState) => state.authReducer.authorized);

    if (isAuth) {
        return <Navigate to="/"/>
    }
    return <>{props.children}</>
}

export default NotAuthorizedLayout;