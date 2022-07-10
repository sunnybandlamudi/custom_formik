
import {useContext} from "react";
import {customFormContext} from "./CFormik";
import React from "react";
import _ from "lodash";


function CFormArray({name,children}){

    const formik =  useContext(customFormContext)

    const {setForm} = formik;

    let component;

    let arrayValues = _.get(formik.values,name)

    // console.log(arrayValues)


    function push(index){

        arrayValues.splice(index+1,0,"");
        let obj = {}
        obj[name] = arrayValues
        setForm((prevState) => {
            return {...prevState,...obj}
        })
        // console.log(value)
        setForm((prevState) => {
            return {...prevState,...obj}
        })
    }

    function remove(index){

        arrayValues.splice(index,1)
        let obj = {}
        obj[name] = arrayValues
        setForm((prevState) => {
            return {...prevState,...obj}
        })

    }

    function displayComponent(){

        if(children){
            let props= {}
            props.values = formik.values
            props.push = push
            props.remove = remove

            component = React.createElement("div",{},children(props))
        }

        return component
    }

    return(
        <>
            {displayComponent()}
        </>
    )
}


export default CFormArray