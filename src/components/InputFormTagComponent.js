import useCustomFormik from "./CustomFormik/useCustomFormik";
import CFormik from "./CustomFormik/CFormik";
import CForm from "./CustomFormik/CForm";
import CFeild from "./CustomFormik/CFeild";
import CErrorMessage from "./CustomFormik/CErrorMessage";
import TextError from "./CustomFormik/ErrorComponent/TextError";
import _ from "lodash"
import CFormArray from "./CustomFormik/CFormArray";
import {Button} from "react-bootstrap";

function validate(values) {
    let errors = {}

    if (values.email.length < 3) {
        errors.email = true
    }

    if (values.username.length < 3) {
        errors.username = true
    }

    if (values.address?.street.length < 3) {
        _.set(errors, ["address", "street"], true);
    }
    return errors;
}

function InputFormTagComponent() {


    const initialValues = {
        "username": "sample",
        "email": "",
        "address": {
            "street": "Street Name",
            "city": "City Name"
        },
        "phone": ["Phone 1", ""],
        "skills": ["skill 1", "skill 2"]
    }


    function submit(values) {
        console.log("Form Values", values)
    }


    return (
        <div>
            <>
                <h1>Custom Formik Components</h1>
                <CFormik initailValues={initialValues} onSubmit={submit} validate={validate} validateOnChange={false}>
                    <CForm>
                        <div className="form-field">
                            <label htmlFor="username" className="form-label fw-bold">Username</label>
                            <CFeild type="text" id="username" name="username" className="form-control">
                                {
                                    (props) => {
                                        // console.log("props ",props)
                                        return (
                                            <input type="text" id="username" className="form-control"
                                                   name={props.name} {...props.form.getProps(props.name)}/>
                                        )
                                    }
                                }

                            </CFeild>
                            <CErrorMessage name="username" component="div"></CErrorMessage>
                            <CErrorMessage name="username" component={TextError}></CErrorMessage>
                            <CErrorMessage name="username">
                                {
                                    (errorMsg) => {
                                        return (
                                            <div className="error"> {errorMsg}  </div>
                                        )
                                    }
                                }
                            </CErrorMessage>
                        </div>

                        {/*<input type="text" id="username" className="form-control" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username}/>*/}
                        <div className="form-field">
                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                            <CFeild type="email" id="email" name="email" className="form-control"></CFeild>
                            <CErrorMessage name="email"></CErrorMessage>
                        </div>
                        <div className="form-field">
                            <label htmlFor="street" className="form-label fw-bold">Street</label>
                            <CFeild type="text" id="street" name={"address.street"} className="form-control"></CFeild>
                            <CErrorMessage className="error" component="p" errorMessage={"Min length should be 3"}
                                           name={"address.street"}></CErrorMessage>
                        </div>
                        <div className="form-field">
                            <label htmlFor="city" className="form-label fw-bold">City</label>
                            <CFeild type="text" id="city" name={"address.city"} className="form-control"></CFeild>
                        </div>
                        <div className="form-field">
                            <label htmlFor="phone_1" className="form-label fw-bold">Primary</label>
                            <CFeild type="text" id="phone_1" placeholder="Phone 1" name="phone[0]"
                                    className="form-control"></CFeild>
                        </div>
                        <div className="form-field">
                            <label htmlFor="phone_2" className="form-label fw-bold">Secondary</label>
                            <CFeild type="text" id="phone_2" placeholder="Phone 2" name="phone[1]"
                                    className="form-control"></CFeild>
                        </div>
                        <h3 className="padding-top">Form Arrays</h3>
                        <div className="form-field">
                            <label className="form-label fw-bold">Skills</label>
                            <CFormArray name="skills">
                                {
                                    (props) => {
                                        // console.log("Field ", props)

                                        const {values, push, remove} = props;
                                        const {skills} = values

                                        return (

                                            <div className="skills">
                                                {
                                                    skills.map((name, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <label htmlFor={`skill_${index}`}
                                                                       className="form-label fw-bold">Skill
                                                                    - {index + 1}</label>
                                                                <div className="d-flex skill">
                                                                    <CFeild name={`skills[${index}]`}
                                                                            id={`skill_${index}`}
                                                                            className="form-control"></CFeild>

                                                                    <Button type="button"
                                                                            className={"btn btn-primary actions"}
                                                                            onClick={() => push(index)}> + </Button>
                                                                    <Button type="button"
                                                                            className={"btn btn-danger actions"}
                                                                            onClick={() => {
                                                                                remove(index)
                                                                            }}> - </Button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        )
                                    }
                                }
                            </CFormArray>
                        </div>
                        <div className="d-flex justify-content-center ">
                            <Button type="submit" className="btn-primary margin-top-50" >Submit</Button>
                        </div>
                    </CForm>
                </CFormik>

            </>
        </div>
    )
}

export default InputFormTagComponent