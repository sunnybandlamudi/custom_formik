import {useContext} from "react";
import {customFormContext} from "./CFormik";


function CForm({children, ...rest}){

    const formik = useContext(customFormContext)

    const submit = formik.handleSubmit

    return (
        <form {...rest} className="form-control" onSubmit={submit}>
            {children}
        </form>
    )
}

export default CForm;