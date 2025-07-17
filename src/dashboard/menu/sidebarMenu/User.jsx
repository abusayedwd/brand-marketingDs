import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal } from 'antd';
 
 
import { useContentCreatorQuery } from '../../../redux/features/users/contentCreator';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { TiSocialPinterest } from 'react-icons/ti';

const ContentCreatorListPage = () => {
  const { data: contentCreator, isLoading, error } = useContentCreatorQuery(); // Fetching the data
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  useEffect(() => {
    console.log('Fetched Content Creators:', contentCreator);
  }, [contentCreator]);

  // Show details modal
  const showModal = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInfluencer(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading content creators</div>;

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Platforms',
      dataIndex: 'socialMedia',
      key: 'socialMedia',
      render: (socialMedia) => (
        <div className="flex space-x-2">
          {socialMedia.map((platform, index) => (
            <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer">
              {/* Displaying social media icons based on the platform */}
               {platform.platform === 'Facebook' && <FacebookOutlined className="h-8 w-8 text-blue-600" />}
          
          {/* Instagram Icon */}
          {platform.platform === 'Instagram' && <InstagramOutlined className="h-8 w-8 text-pink-600" />}
          
          {/* Twitter Icon */}
          {platform.platform === 'Twitter' && <TwitterOutlined className="h-8 w-8 text-blue-400" />}
          
          {/* Snapchat Icon */}
          {platform.platform === 'Snapchat' && <TiSocialPinterest className="h-8 w-8 text-yellow-500" />}
          
          {/* TikTok Icon */}
          {platform.platform === 'TikTok' && <FaTiktok className="h-8 w-8 text-black" />}
          
          {/* YouTube Icon */}
          {platform.platform === 'YouTube' && <FaYoutube className="h-8 w-8 text-red-600" />}
        
            </a>
          ))}
        </div>
      ),
    },
    {
      title: 'Subscription Plan',
      dataIndex: 'subscriptionId.planName',
      key: 'subscription',
      render: (_,subscription) => (
        <p>{subscription?.subscriptionId.planName}</p>
      )
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

  // Displaying the content creators in a table
  return (
    <div className=" mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">All Content Creators List</h1>
      <Table
        columns={columns}
        dataSource={contentCreator?.data?.attributes?.results || []} // Safely access data
        rowKey="id" // Using 'id' as the unique key for each row
      />

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
            <p><strong>Subscription:</strong> {selectedInfluencer.subscriptionId.planName}</p>
            <p><strong>Price:</strong> {selectedInfluencer.subscriptionId.price} {selectedInfluencer.subscriptionId.currency}</p>
            <p><strong>Duration:</strong> {selectedInfluencer.subscriptionId.duration}</p>
            <p><strong>Previous Experience:</strong> {selectedInfluencer.previousExperience}</p>
            <p><strong>Interests:</strong> {selectedInfluencer.interests.join(', ')}</p>
            <div>
              <strong>Platforms:</strong>
              <div className="flex space-x-2 mt-2">
                {selectedInfluencer.socialMedia.map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer">
                    {/* Displaying social media icons for the platform */}
                     {platform.platform === 'Facebook' && <FacebookOutlined className="h-8 w-8 text-blue-600" />}
          
          {/* Instagram Icon */}
          {platform.platform === 'Instagram' && <InstagramOutlined className="h-8 w-8 text-pink-600" />}
          
          {/* Twitter Icon */}
          {platform.platform === 'Twitter' && <TwitterOutlined className="h-8 w-8 text-blue-400" />}
          
          {/* Snapchat Icon */}
          {platform.platform === 'Snapchat' && <TiSocialPinterest className="h-8 w-8 text-yellow-500" />}
          
          {/* TikTok Icon */}
          {platform.platform === 'TikTok' && <FaTiktok className="h-8 w-8 text-black" />}
          
          {/* YouTube Icon */}
          {platform.platform === 'YouTube' && <FaYoutube className="h-8 w-8 text-red-600" />}
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

export default ContentCreatorListPage;
