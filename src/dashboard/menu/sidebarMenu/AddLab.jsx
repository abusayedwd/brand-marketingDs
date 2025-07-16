import React from 'react';
import { Input, Button, Upload, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddLab = () => {
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log('Form values:', values);
    message.success('Lab added successfully');
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-6">Add Lab</h2>
      <Form onFinish={handleSubmit} layout="vertical" className="space-y-6">
        {/* Photo Upload */}
        <Form.Item
          label="Photo"
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
          rules={[{ required: true, message: 'Please upload a photo!' }]}
        >
          <Upload
            name="photo"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false} // Prevent auto upload
            className="w-full"
          >
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        </Form.Item>

        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter lab name!' }]}
        >
          <Input placeholder="Enter Lab Name" className="w-full" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter email!' }]}
        >
          <Input type="email" placeholder="Enter Lab Email" className="w-full" />
        </Form.Item>

        {/* URL */}
        <Form.Item
          label="URL"
          name="url"
          rules={[{ required: true, message: 'Please enter a URL!' }]}
        >
          <Input type="url" placeholder="Enter Lab URL" className="w-full" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter lab description!' }]}
        >
          <Input.TextArea placeholder="Enter Lab Description" rows={4} className="w-full" />
        </Form.Item>

        {/* Publish Button */}
        <div className="flex justify-center">
          <Button type="primary" htmlType="submit" className="w-1/2">
            Publish
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddLab;
