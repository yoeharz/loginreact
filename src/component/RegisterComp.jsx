import React, { Fragment, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, CardImg } from 'reactstrap';
import axios from 'axios'
//import { AuthContext } from '../App'
//import { Link } from 'react-router-dom';

const qs = require('querystring')
const api = 'http://localhost:3001'

var Recaptcha = require('react-recaptcha');

export default function RegisterComp(props) {
    //const { dataGlobal, dispatch } = useContext(AuthContext)

    const initialState = {
        isSubmitting: false,
        errorMessage: null,
        successMessage: null,
        isVerified: false
    }

    const stateForn = {
        username: "",
        password: "",
        email: ""
    }

    const [data, setData] = useState(initialState)
    const [dataForm, setDataForm] = useState(stateForn)

    // specifying your onload callback function
    var callback = function () {
        console.log('Done!!!!');
    };

    // specifying verify callback function
    var verifyCallback = function (response) {
        console.log(response);
        if (response) {
            setData({
                ...data,
                isVerified: true
            })
        }
    };

    const handleInputChange = event => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        
        if (data.isVerified) {
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null,
                successMessage: null
            })

            const requestBody = {
                username: dataForm.username,
                password: dataForm.password,
                email: dataForm.email
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post(api + '/auth/api/v1/register', qs.stringify(requestBody), config).then(res => {
                if (res.data.success === true && res.data.isRegistered === false) {
                    setData({
                        ...data,
                        isSubmitting: false,
                        successMessage: "Berhasil menambahkan user, silahkan cek email untuk melakukan verifikasi.",
                        errorMessage: null
                    })

                    setDataForm({
                        ...dataForm,
                        username: "",
                        password: "",
                        email: ""
                    })

                } else if (res.data.success === false && res.data.isRegistered === true) {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: res.data.message,
                        successMessage: null
                    })
                } else {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: res.data.message,
                        successMessage: null
                    })
                }

                throw res
            })
        } else {
            alert('Anda diduga robot')
        }

    }



    return (
        <Fragment>
            <Container>
                <br />
                <Row>
                    <Col><CardImg width="100%" src="https://placeimg.com/640/380/people" /></Col>
                    <Col>
                        <h1>Registrasi Form</h1>
                        <hr />

                        {data.successMessage && (
                            <div className="alert alert-success" role="alert">
                                {data.successMessage}
                            </div>
                        )}
                        <Form onSubmit={handleFormSubmit} >
                            <FormGroup>
                                <Label for="usernameid">Username</Label>
                                <Input type="text" name="username" id="usernameid" placeholder="Username" value={dataForm.username} onChange={handleInputChange} required="true" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Password" value={dataForm.password} onChange={handleInputChange} required="true" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email" value={dataForm.email} onChange={handleInputChange} required="true" />
                            </FormGroup>

                            <Recaptcha
                                sitekey="6LeYKO8ZAAAAADo84LRIvpaXbUVYatuBlwHkl7Qp"
                                render="explicit"
                                verifyCallback={verifyCallback}
                                onloadCallback={callback}
                            />

                            <br/>
                            {data.errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {data.errorMessage}
                                </div>
                            )}
                            <Button disabled={data.isSubmitting}>
                                {data.isSubmitting ? ("...Loading") : ("Register")}
                            </Button>
                        </Form>
                        
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
