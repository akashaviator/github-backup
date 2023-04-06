import React, { useState } from "react";
import { Form, Input, Button, Layout, Alert } from "antd";
import axios from "axios";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";

const layoutStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  borderRadius: "20px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  backgroundColor: "#fff",
  maxWidth: "70%",
  width: "100%",
  marginTop: "15%",
  marginBottom: "15%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const BackupForm = () => {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [frequency, setFrequency] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/api/backups", {
        repositoryUrl,
        frequency,
      });
      console.log(response.data);
      if (response.data.result === "success") {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error.message);
      setSuccessMessage("");
    }
  };
  const { Content } = Layout;

  return (
    <Layout style={layoutStyle}>
      <Content style={containerStyle}>
        {successMessage && (
          <Alert message={successMessage} type="success" showIcon closable />
        )}
        {errorMessage && (
          <Alert message={errorMessage} type="error" showIcon closable />
        )}
        <Form style={formStyle} onFinish={handleSubmit}>
          <Form.Item
            style={{ margin: "10px" }}
            label="Repository URL"
            name="repositoryUrl"
          >
            <Input
              value={repositoryUrl}
              onChange={(event) => setRepositoryUrl(event.target.value)}
            />
          </Form.Item>
          <Cron value={frequency} setValue={setFrequency} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Schedule Backup
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default BackupForm;
