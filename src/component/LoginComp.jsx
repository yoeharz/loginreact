import React, { Fragment, useContext, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, CardImg } from 'reactstrap';
import axios from 'axios'
import { AuthContext } from '../App'
import { Link } from 'react-router-dom';

const qs = require('querystring')
const api = 'http://localhost:3001'

var Recaptcha = require('react-recaptcha');

export default function LoginComp(props) {
    const { dataGlobal, dispatch } = useContext(AuthContext)

    const initialState = {
        isSubmitting: false,
        errorMessage: null,
        isVerified: false
    }

    const stateForn = {
        username: "",
        password: ""
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
        if(response){
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
        if(data.isVerified){
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null
            })
    
            const requestBody = {
                username: dataForm.username,
                password: dataForm.password
            }
    
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
    
            axios.post(api + '/auth/api/v1/login', qs.stringify(requestBody), config).then(res => {
                if (res.data.success === true && res.data.isVerified === 1) {
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data,
                        ...dataGlobal,
                        isAuthenticated: true
                    })
    
                    //redirect ke dashboard
                    props.history.push("/dashboard")
    
                } else if (res.data.success === true && res.data.isVerified === 0){
                    setData({
                        ...data,
                        isSubmitting: false, 
                        errorMessage: "Email anda belum terverifikasi dan silahkan cek email."
                    })
                } else {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: res.data.Message
                    })
                }
    
                throw res
            })
        }else{
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
                        <h1>Login Form</h1>
                        <hr />
                        <Form onSubmit={handleFormSubmit} >
                            <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input type="text" name="username" id="exampleEmail" placeholder="with a placeholder" value={dataForm.username} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" value={dataForm.password} onChange={handleInputChange} />
                            </FormGroup>

                            <Recaptcha  
                                sitekey="6LeYKO8ZAAAAADo84LRIvpaXbUVYatuBlwHkl7Qp"
                                render="explicit"
                                verifyCallback={verifyCallback}
                                onloadCallback={callback}
                            />

                            <br />

                            {data.errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {data.errorMessage}
                                </div>
                            )}
                            <Button disabled={data.isSubmitting}>
                                {data.isSubmitting ? ("...Loading") : ("Login")}
                            </Button>
                        </Form>
                        <p>Belum punya akun? <Link to="/register">Register</Link></p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
