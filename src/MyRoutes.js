import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import HomePge from "./HomePage";
const MyRoutes = ()=>{
    return(
        <Fragment>
            <Routes>
                <Route path="/" element={<HomePge/>}/>
                <Route path="Modify/:id" />
                <Route/>
            </Routes>
        </Fragment>
    )
}
