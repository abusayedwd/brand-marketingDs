import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space } from 'antd';
 
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, } from '@ant-design/icons'; // Social Media Icons
import { useGetAllCampaignQuery } from '../../../redux/features/campaign/getAllcampaign';
import url from "./../../../redux/api/baseUrl"
const CampaignListPage = () => {
  const { data: campaignData, isLoading, error } = useGetAllCampaignQuery(); // Fetching the campaigns
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
console.log(campaignData)
  useEffect(() => {
    console.log('Fetched Campaigns:', campaignData);
  }, [campaignData]);

  // Show details modal
  const showModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCampaign(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading campaigns</div>;

  // Columns for the Ant Design Table
  const columns = [
    {
      title: 'S. No',
      key: 'serialNumber',
      render: (_, __, index) => index + 1, // Calculate serial number based on index
    },
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: 'influencerCount',
      dataIndex: 'influencerCount',
      key: 'influencerCount',
      render: (_, campaign) => (
         <p>{campaign?.influencerCount}</p>
      ),
    },
    {
      title: 'totalAmount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (_, campaign) => (
         <p>{campaign?.totalAmount}</p>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, campaign) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(campaign)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  // Displaying the campaign data in a table
  return (
    <div className=" mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">All Campaigns</h1>
      <Table
        columns={columns}
        dataSource={campaignData?.data?.attributes?.results || []} // Safely access data
        rowKey="id" // Using 'id' as the unique key for each row
      />

      {/* Modal to View Campaign Details */}
      <Modal
        title="Campaign Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedCampaign && (
          <div className="space-y-4">
            <p><strong>Campaign Name:</strong> {selectedCampaign.campaignName}</p>
            <p><strong>Status:</strong> {selectedCampaign.status}</p>
            <p><strong>Budget:</strong> ${selectedCampaign.budget}</p>
            <p><strong>Description:</strong> {selectedCampaign.description}</p>
            <p><strong>Start Date:</strong> {new Date(selectedCampaign.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedCampaign.endDate).toLocaleDateString()}</p>
            <p><strong>Influencer Count:</strong> {selectedCampaign.influencerCount}</p>
            <p><strong>Selected Platforms:</strong> {selectedCampaign.selectedPlatforms.join(', ')}</p>
            <div>
              <strong>Campaign Image:</strong>
              <img src={url + selectedCampaign.image} alt="Campaign" className="w-full h-80 my-4" />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CampaignListPage;
