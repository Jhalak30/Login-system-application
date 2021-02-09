import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { forgotPassword } from "../../actions";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const changePassword = (e) => {
    e.preventDefault();
    const user = { email, password: newpassword };
    dispatch(forgotPassword(user));
  };

  if (auth.changedPassword) {
    return <Redirect to={`/signIn`} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "70px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={changePassword}>
              <Input
                type="email"
                label="Email address"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                label="New Password"
                placeholder="New Password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ForgotPass;
