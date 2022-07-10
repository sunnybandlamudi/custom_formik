import useCustomFormik from "./CustomFormik/useCustomFormik";
import _ from "lodash"

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

function InputFormPlainComponent() {

    const formik = useCustomFormik({
        initialState: {
            "username": "sample",
            "email": "",

        },
        onSubmit: submit,
        validate: validate
    })

    function submit(values) {
        console.log("Form Values", values)
    }



    return (
        <div>
            <form className="form-control" onSubmit={formik.handleSubmit}>

                <div className="form-field">
                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                    <input type="text" id="username" className="form-control "
                           name="username"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.username}
                    />

                    {(formik.errors?.username && formik.touched?.username) ? <div>Username Error </div> : ""}
                </div>

                <div className="form-field">

                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                    <input type="text" id="email" className="form-control"
                           name="email"
                           {...formik.getProps('email')}
                    />

                    {(formik.errors?.email && formik.touched?.email) ? <div className="text-danger">Email Error </div> : ""}
                </div>
                <button type="submit" className="btn-primary margin-top-50">Submit</button>
            </form>
            <div> Touched:</div>
            {
                Object.keys(formik.touched).map(function (key) {
                    return <div key={key}> {key} : true </div>
                })
            }


        </div>
    )
}

export default InputFormPlainComponent