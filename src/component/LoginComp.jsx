import React, { Fragment, useContext, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, CardImg } from 'reactstrap';
import axios from 'axios'
import { AuthContext } from '../App'
import { Link } from 'react-router-dom';
const qs = require('querystring')
const api = 'http://localhost:3001'

export default function LoginComp(props) {
    const { dataGlobal, dispatch } = useContext(AuthContext)

    const initialState = {
        username: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = useState(initialState)
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        const requestBody = {
            username: data.username,
            password: data.password
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(api + '/auth/api/v1/login', qs.stringify(requestBody), config).then(res => {
            if (res.data.success === true) {
                dispatch({
                    type: 'LOGIN',
                    payload: res.data,
                    ...dataGlobal,
                    isAuthenticated: true
                })

                //redirect ke dashboard
                props.history.push("/dashboard")

            } else {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: res.data.Message
                })
            }

            throw res
        })
    }



    return (
        <Fragment>
            <Container>
                <br />
                <Row>
                    <Col><CardImg width="100%" src="https://placeimg.com/640/380/people"/></Col>
                    <Col>
                        <h1>Login Form</h1>
                        <hr/>
                        <Form onSubmit={handleFormSubmit} >
                            <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input type="text" name="username" id="exampleEmail" placeholder="with a placeholder" value={data.username} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" value={data.password} onChange={handleInputChange} />
                            </FormGroup>
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
