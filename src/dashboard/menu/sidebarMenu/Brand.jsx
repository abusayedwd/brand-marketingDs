import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { useGetBrandQuery } from '../../../redux/features/users/brand';
 // import your custom hook

const BrandListPage = () => {
  const { data: brandData, isLoading, error } = useGetBrandQuery(); // Fetching the data
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    console.log('Fetched Brand Data:', brandData);
  }, [brandData]);

  // Show details modal
  const showModal = (brand) => {
    setSelectedBrand(brand);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBrand(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand data</div>;

  // Columns for the Ant Design Table
  const columns = [
    {
      title: 'S. No',
      dataIndex: 'key',
      key: 'key',
      render: (_, __, index) => index + 1, 
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Brand Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website) => (
        <a href={website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, brand) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(brand)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  // Displaying the brand data in a table
  return (
    <div className=" mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">All Brands List</h1>
      <Table
        columns={columns}
        dataSource={brandData?.data?.attributes?.results || []} // Safely access data
        rowKey="id" // Using 'id' as the unique key for each row
      />

      {/* Modal to View Brand Details */}
      <Modal
        title="Brand Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedBrand && (
          <div className="space-y-4">
            <p><strong>Brand Name:</strong> {selectedBrand.companyName}</p>
            <p><strong>Email:</strong> {selectedBrand.email}</p>
            <p><strong>Industry:</strong> {selectedBrand.industry}</p>
            <p><strong>Bio:</strong> {selectedBrand.bio || 'No bio available'}</p>
            <p><strong>Previous Experience:</strong> {selectedBrand.previousExperience}</p>
            <p><strong>Website:</strong> <a href={selectedBrand.website} target="_blank" rel="noopener noreferrer">{selectedBrand.website}</a></p>
            <p><strong>Plan:</strong> {selectedBrand.planName}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BrandListPage;
