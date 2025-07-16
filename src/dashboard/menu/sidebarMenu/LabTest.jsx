import React, { useState } from 'react';
import { Table, Button, Modal, Select, Input, Form } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LabTestPage = () => {
   const navigate = useNavigate();
  const [labTests, setLabTests] = useState([
    { id: 1, labName: 'Lab 1', testName: 'Blood Test', description: 'Complete blood count', price: '$50', status: 'Active' },
    { id: 2, labName: 'Lab 2', testName: 'Urine Test', description: 'Urine analysis', price: '$30', status: 'Inactive' },
    { id: 3, labName: 'Lab 3', testName: 'X-Ray', description: 'Chest X-Ray', price: '$100', status: 'Active' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [newTest, setNewTest] = useState({
    labName: '',
    testName: '',
    description: '',
    price: '',
    status: 'Active',
  });

  const showModal = (test) => {
    setSelectedTest(test);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = (value) => {
    setLabTests(
      labTests.map((test) =>
        test.id === selectedTest.id ? { ...test, status: value } : test
      )
    );
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    setLabTests(labTests.filter((test) => test.id !== id));
  };

  const handleAddTest = () => {
     navigate('addlabtest')
  };

  const columns = [
    {
      title: 'SI NO',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Lab Name',
      dataIndex: 'labName',
      key: 'labName',
    },
    {
      title: 'Test Name',
      dataIndex: 'testName',
      key: 'testName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{status}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, test) => (
        <div className="flex space-x-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => showModal(test)}
            className="text-blue-500"
          >
            View
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(test.id)}
            className="text-red-500"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lab Test Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-blue-600"
          onClick={handleAddTest}
        >
          Add Lab Test
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={labTests}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal to change status */}
      <Modal
        title="Change Status"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="space-y-4">
          <h4 className="font-semibold">Test: {selectedTest?.testName}</h4>
          <h5>Description: {selectedTest?.description}</h5>
          <h5>Price: {selectedTest?.price}</h5>

          <Select
            defaultValue={selectedTest?.status}
            style={{ width: '100%' }}
            onChange={handleStatusChange}
          >
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </div>
      </Modal>
 
    </div>
  );
};

export default LabTestPage;
