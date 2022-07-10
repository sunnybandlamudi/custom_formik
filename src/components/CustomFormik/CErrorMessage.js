import {useContext} from "react";
import {customFormContext} from "./CFormik";
import React from "react";
import _ from  "lodash"
import {isFunction, isObject, isString} from "./utils/utils";

function CErrorMessage({component, children ,name, className, errorMessage}) {

    const formik = useContext(customFormContext)

    const defaultErrorMessage = errorMessage || "Default Error Message"
    const props = {'className': className || "text-danger"}

    const isDisplay =  _.get(formik.errors,name) && _.get(formik.touched, name);

    let errorComponent;

    function displayError(){

        if(!isDisplay){
            return null
        }

        if(isString(component)){
            errorComponent =  React.createElement(component,props,defaultErrorMessage)
        }
        else if(isFunction(component)){
            errorComponent =  React.createElement(component,props)
        }
        else if(!component && isFunction(children)){
            errorComponent =  React.createElement("div",props,children("Function Component Error Message"))
        }
        else{
            errorComponent =  React.createElement("div",props,defaultErrorMessage)
        }

        return errorComponent
    }

    return (
        <>
            {displayError()}
        </>

    )
}

export default CErrorMessage