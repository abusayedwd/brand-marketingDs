import React, { useState } from 'react';
import { Table, Button, Input, Select, Space, Dropdown, Menu, message } from 'antd';
import { SearchOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';

const AdminsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState([
    { id: 1, username: 'Lindsay', email: 'Lindsay@gmail.com', role: 'Super admin', createDate: '12-31-2024', status: 'Active' },
    { id: 2, username: 'Lindsay 2', email: 'Lindsay2@gmail.com', role: 'Admin', createDate: '12-31-2024', status: 'Active' },
    { id: 3, username: 'MD Mahmudur Rahman Talukder', email: 'mahmudur.uiuxdesign@gmail.com', role: 'Admin', createDate: '12-31-2024', status: 'Deactivated' },
  ]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusChange = (value, record) => {
    const updatedAdmins = admins.map(admin => 
      admin.id === record.id ? { ...admin, status: value } : admin
    );
    setAdmins(updatedAdmins);
    message.success(`Status updated to ${value}`);
  };

  const columns = [
    { title: 'SI NO', dataIndex: 'id', key: 'id' },
    { title: 'USER NAME', dataIndex: 'username', key: 'username' },
    { title: 'EMAIL', dataIndex: 'email', key: 'email' },
    { title: 'ROLE', dataIndex: 'role', key: 'role' },
    { title: 'CREATE DATE', dataIndex: 'createDate', key: 'createDate' },
    {
      title: 'STATUS', 
      dataIndex: 'status', 
      key: 'status',
      render: (status, record) => (
        <Select 
          defaultValue={status} 
          onChange={(value) => handleStatusChange(value, record)} 
          style={{ width: 120 }}
        >
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Deactivated">Deactivated</Select.Option>
        </Select>
      )
    },
    {
      title: 'ACTION', 
      key: 'action', 
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            onClick={() => message.info(`Viewing details for ${record.username}`)} 
          />
          <Button 
            type="link" 
            icon={<CloseOutlined />} 
            onClick={() => message.error(`Deleting ${record.username}`)} 
          />
        </Space>
      ),
    },
  ];

  // Filter admins by search term
  const filteredAdmins = admins.filter((admin) => 
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<SearchOutlined />}
        />
        <Button type="primary">+ Add Admin</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredAdmins}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminsPage;
