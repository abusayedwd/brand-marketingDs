import React, { useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faSnapchat } from '@fortawesome/free-brands-svg-icons';
 

// Data
const influencerData = [
  {
    key: '1',
    fullName: 'Bipul',
    userName: 'daedrrr',
    email: 'abu@gmail.com',
    platforms: [
      { platform: 'Facebook', followers: '324k', url: 'https://www.facebook.com/', icon: faFacebook },
      { platform: 'Instagram', followers: '43k', url: 'https://www.instagram.com/', icon: faInstagram },
      { platform: 'Snapchat', followers: '33k', url: 'https://www.snapchat.com/', icon: faSnapchat },
    ],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    subscription: 'Abonnement Starter',
    planPrice: '29.99 EUR',
    planDuration: '1 month',
    previousExperience: 'none',
    interests: ['Fashion & Style', 'Gaming', 'Food & Cooking'],
  },
  {
    key: '2',
    fullName: 'Testing Influencer',
    userName: '',
    email: 'influencer@gmail.com',
    platforms: [
      { platform: 'Facebook', followers: '34k', url: 'https://www.facebook.com/', icon: faFacebook },
      { platform: 'Instagram', followers: '36k', url: 'https://www.instagram.com/', icon: faInstagram },
      { platform: 'Twitter', followers: '323k', url: 'https://www.twitter.com/', icon: faTwitter },
    ],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    subscription: 'Abonnement Starter',
    planPrice: '29.99 EUR',
    planDuration: '1 month',
    previousExperience: 'none',
    interests: ['Fashion & Style', 'Beauty & Cosmetics', 'Gaming'],
  },
];

// Modal View for displaying detailed information
const InfluencerListPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  
 const {data:}

  const showModal = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInfluencer(null);
  };

  const columns = [
    {
      title: 'S. No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Platforms',
      dataIndex: 'platforms',
      key: 'platforms',
      render: (platforms) => (
        <div className="flex space-x-2">
          {platforms.map((platform, index) => (
            <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={platform.icon} className="h-6 w-6 text-blue-600" />
            </a>
          ))}
        </div>
      ),
    },
    {
      title: 'Subscription',
      dataIndex: 'subscription',
      key: 'subscription',
    },
    {
      title: 'Price',
      dataIndex: 'planPrice',
      key: 'planPrice',
    },
    {
      title: 'Duration',
      dataIndex: 'planDuration',
      key: 'planDuration',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, influencer) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(influencer)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">All Influencers List</h1>
      <Table columns={columns} dataSource={influencerData} />

      {/* Modal to View Influencer Details */}
      <Modal
        title="Influencer Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedInfluencer && (
          <div className="space-y-4">
            <p><strong>Name:</strong> {selectedInfluencer.fullName}</p>
            <p><strong>Email:</strong> {selectedInfluencer.email}</p>
            <p><strong>Bio:</strong> {selectedInfluencer.bio}</p>
            <p><strong>Subscription:</strong> {selectedInfluencer.subscription}</p>
            <p><strong>Price:</strong> {selectedInfluencer.planPrice}</p>
            <p><strong>Duration:</strong> {selectedInfluencer.planDuration}</p>
            <p><strong>Previous Experience:</strong> {selectedInfluencer.previousExperience}</p>
            <p><strong>Interests:</strong> {selectedInfluencer.interests.join(', ')}</p>
            <div>
              <strong>Platforms:</strong>
              <div className="flex space-x-2 mt-2">
                {selectedInfluencer.platforms.map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={platform.icon} className="h-8 w-8 text-blue-600" />
                    <span className="ml-2">{platform.platform} ({platform.followers})</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InfluencerListPage;
