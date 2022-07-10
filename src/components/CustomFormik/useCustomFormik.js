import {useCallback, useReducer, useState} from "react";
import _, {get, isEmpty} from "lodash"
import _copyObject from "lodash/_copyObject"


function reducer(state,action){

    // console.log(state,action)
    switch(action.type){
        case 'SET_TOUCHED':
            return {... state, isTouched:action.payload}
        case 'SET_DIRTY':
            return {... state, isDirty:action.payload}
        case 'SET_VALID':
            return {... state, isValid:action.payload}
        default:
            return state
    }
    return state

}

function useCustomFormik({initialState, onSubmit, validateOnChange = true, validateOnBlur = true,validate,...rest}){

    const [formValues, setForm] = useState({...initialState})
    const [touchedForm, setTouchedForm] = useState({});
    const [errors, setErrors] = useState({});
    const [formStatus, dispatch] = useReducer(reducer, {isDirty:false,isTouched:false,isValid:false});

    const formik = {
        isValid:formStatus.isValid,
        isDirty: formStatus.isDirty,
        isTouched: formStatus.isTouched
    }


    const handleChange = useCallback(function handleChange(e){

        let updatedValue =  formValues
        let key = e.target.name
        let value = e.target.value

        if(key.includes(".")){
            let path  = _.split(key,".")
            _.set(updatedValue,path,value)
        }
        else{
            _.set(updatedValue,key,value)
        }

        console.log("Updated Values", updatedValue)

        setForm(prevState => {
           return  {...prevState, ...updatedValue}
        })

        if(validateOnChange){
            updateError()
        }
        //On value change
        dispatch({type:'SET_DIRTY',payload:true})
        updateIsValid();
        // formik.dirty = true;

    })

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        console.log(formik)
        onSubmit(formValues)
    },[onSubmit,formik])

    const handleBlur = useCallback( (e) => {

        let updatedValues = touchedForm
        let key = e.target.name;

        if(key.includes(".")){
            let path = _.split(key,".")
            _.set(updatedValues,key,true)
        }
        else{
            _.set(updatedValues,key,true)
        }
        setTouchedForm(prevState => {
            return {...prevState,...updatedValues}
        })

        if(validateOnBlur){
            updateError();
        }
        dispatch({type:'SET_TOUCHED',payload:true})
        updateIsValid();
    })

    function updateError(){

        console.log("Errors Check")
        setErrors((prevState) => {
            let errorObj = validate(formValues)
            return {...errorObj}
        })
    }

    function updateIsValid(){
        if(_.isElement(validate(formValues)))
        {
            dispatch({type:'SET_VALID',payload:true})
        }
        else {
            dispatch({type:'SET_VALID',payload:false})
        }
    }

    formik.values = formValues;
    formik.touched = touchedForm;
    formik.errors = errors;
    formik.handleChange = handleChange;
    formik.handleSubmit = handleSubmit;
    formik.handleBlur = handleBlur;
    formik.setForm = setForm;

    formik.isValid = formStatus.isValid
    formik.isTouched = formStatus.isTouched
    formik.isDirty = formStatus.isDirty

    formik.getProps = useCallback((name)=>{
        let obj = {}
        obj.value = _.get(formValues,name)
        obj.onChange = handleChange
        obj.onBlur = handleBlur
        return obj
    })


    return formik
}


export default useCustomFormik