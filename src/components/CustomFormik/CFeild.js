import {useContext} from "react";
import {customFormContext} from "./CFormik";
import {render} from "react-dom";
import React from "react";
import {isFunction} from "./utils/utils";

function CField({children, ...attributes}) {

    const formik = useContext(customFormContext)
    // console.log(children)
    let child;


    function displayFeild() {

        if (children && isFunction(children)) {
            let info = {field: formik.getProps(attributes?.name), form: formik, name: attributes?.name}
            return React.createElement(React.Fragment, {}, children({...info}))
        }
        else{
            return <input {...attributes} {...formik.getProps(attributes?.name)} />
        }
    }

    return (
        <>
            {displayFeild()}
        </>
    )
}

export default CField