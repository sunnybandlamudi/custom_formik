import React from "react";
import useCustomFormik from "./useCustomFormik";

const customFormContext = React.createContext({})


const CFormik = ({initailValues, validate, onSubmit,children,validateOnChange=true,validateOnBlur=true, ...rest}) => {

    const formik = useCustomFormik({
        initialState: initailValues,
        onSubmit:onSubmit,
        validate:validate,
        validateOnChange:validateOnChange,
        validateOnBlur:validateOnBlur
    })


    function printFormik(){
        // displayFormik()
    }
    return (
        <>
            <customFormContext.Provider value={formik}>
                {children}
                {/*{console.log("hai",formik)}*/}
            </customFormContext.Provider>

        </>
    )

}

export {customFormContext}
export default CFormik