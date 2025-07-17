// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Space } from 'antd'; 
// import { useGetWithdrawRequestQuery } from '../../../redux/features/withdraw/getWithdrawRequest';
// import url from '../../../redux/api/baseUrl';

// const WithdrawRequestPage = () => {
//   const { data: withdrawData, isLoading, error } = useGetWithdrawRequestQuery(); // Fetching the data
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedWithdraw, setSelectedWithdraw] = useState(null);

//   useEffect(() => {
//     // console.log('Fetched Withdraw Requests:', withdrawData);
//   }, [withdrawData]);

//   // Show details modal
//   const showModal = (withdraw) => {
//     setSelectedWithdraw(withdraw);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedWithdraw(null);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading withdraw requests</div>;

//   // Columns for the Ant Design Table
//   const columns = [
//     {
//       title: 'S. No',
//       key: 'serialNumber',
//       render: (_, __, index) => index + 1, // Calculate serial number based on index
//     },
//     {
//       title: 'Influencer Name', 
//       key: 'fullName',
//       render: (_, withdraw) => ( 
//         <p>{withdraw.influencerId.fullName}</p>
//       )
      

//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Reason',
//       dataIndex: 'reason',
//       key: 'reason',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, withdraw) => (
//         <Space size="middle">
//           <Button type="primary" onClick={() => showModal(withdraw)}>
//             <p>{withdraw.influencerId.fullName}</p>
//             View Details
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   // Displaying the withdraw request data in a table
//   return (
//     <div className=" mx-auto mt-8">
//       <h1 className="text-3xl font-semibold mb-4">Withdraw Requests</h1>
//       <Table
//         columns={columns}
//         dataSource={withdrawData?.data?.attributes?.results || []} // Safely access data
//         rowKey="id" // Using 'id' as the unique key for each row
//       />

//       {/* Modal to View Withdraw Request Details */}
//       <Modal
//         title="Withdraw Request Details"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//         width={800}
//       >
//         {selectedWithdraw && (
//           <div className="space-y-4">
//             <p><strong>Influencer Name:</strong> {selectedWithdraw.influencerId.fullName}</p>
//             <p><strong>Email:</strong> {selectedWithdraw.influencerId.email}</p>
//             <p><strong>Amount:</strong> ${selectedWithdraw.amount}</p>
//             <p><strong>Status:</strong> {selectedWithdraw.status}</p>
//             <p><strong>Reason:</strong> {selectedWithdraw.reason}</p>
//             <div>
//               <strong>Bank Details:</strong>
//               <p><strong>Bank Name:</strong> {selectedWithdraw.bankDetails.bankName}</p>
//               <p><strong>Account Number:</strong> {selectedWithdraw.bankDetails.accountNumber}</p>
//               <p><strong>Holder Name:</strong> {selectedWithdraw.bankDetails.holderName}</p>
//             </div>
//             {selectedWithdraw.status === 'approved' && selectedWithdraw.approvalNote && (
//               <p><strong>Approval Note:</strong> {selectedWithdraw.approvalNote}</p>
//             )}
//             <div>
//               <strong>Bank Signature:</strong>
//               {selectedWithdraw.image.url && (
//                 <img
//                   src={url + selectedWithdraw.image.url}
//                   alt="Signature"
//                   className="w-full h-auto my-4"
//                 />
//               )}
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default WithdrawRequestPage;



import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Tag, Input, message, Card, Divider } from 'antd';
import { EyeOutlined, DollarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useGetWithdrawRequestQuery } from '../../../redux/features/withdraw/getWithdrawRequest';
import url from '../../../redux/api/baseUrl';
import { useApprovedWithdrawMutation } from '../../../redux/features/withdraw/approvedWithdraw';

const { TextArea } = Input;

const WithdrawRequestPage = () => {
  const { data: withdrawData, isLoading, error } = useGetWithdrawRequestQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [approvalNote, setApprovalNote] = useState('');
  const [paymentImage, setPaymentImage] = useState(null);

 const [approvedWithdraw] = useApprovedWithdrawMutation()


  useEffect(() => {
    // console.log('Fetched Withdraw Requests:', withdrawData);
  }, [withdrawData]);

  // Show details modal
  const showModal = (withdraw) => {
    setSelectedWithdraw(withdraw);
    setIsModalVisible(true);
  };

  // Show payment modal
  const showPaymentModal = (withdraw) => {
    setSelectedWithdraw(withdraw);
    setIsPaymentModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedWithdraw(null);
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalVisible(false);
    setSelectedWithdraw(null);
    setApprovalNote('');
    setPaymentImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPaymentImage(file);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!approvalNote.trim()) {
      message.error('Please enter an approval note');
      return;
    }
    
    if (!paymentImage) {
      message.error('Please upload a payment image');
      return;
    }
  
    // Console log the data
  
    const withdrawId = selectedWithdraw.id;
    
    const withdrawData = new FormData()
     withdrawData.append('approvalNote', approvalNote);

     if(paymentImage){
      withdrawData.append('image', paymentImage);

     }

   try{
    const res = await approvedWithdraw({withdrawData,id:withdrawId}).unwrap()
    console.log(res)
    if(res?.code ===200){
         message.success('Payment processed successfully!');
    }
    setTimeout(() => {
       handlePaymentCancel();
    }, 1000);
   }catch(error){
    console.log(error?.data)
    message.error(error?.data?.message)
   }
  


   
   
  };

  // Get status tag with appropriate color
  const getStatusTag = (status) => {
    const statusConfig = {
      pending: {
        color: 'orange',
        icon: <ClockCircleOutlined />,
        text: 'Pending'
      },
      approved: {
        color: 'green',
        icon: <CheckCircleOutlined />,
        text: 'Approved'
      },
      rejected: {
        color: 'red',
        icon: <ClockCircleOutlined />,
        text: 'Rejected'
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Tag 
        color={config.color} 
        icon={config.icon}
        style={{ 
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '6px'
        }}
      >
        {config.text}
      </Tag>
    );
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error loading withdraw requests</div>;

  // Columns for the Ant Design Table
  const columns = [
    {
      title: 'S. No',
      key: 'serialNumber',
      width: 80,
      render: (_, __, index) => (
        <span className="font-medium text-gray-600">{index + 1}</span>
      ),
    },
    {
      title: 'Influencer Name',
      key: 'fullName',
      render: (_, withdraw) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{withdraw.influencerId.fullName}</span>
          <span className="text-sm text-gray-500">{withdraw.influencerId.email}</span>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="font-bold text-green-600 text-lg">${amount}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => (
        <span className="text-gray-700">{reason || 'No reason provided'}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, withdraw) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EyeOutlined />}
            onClick={() => showModal(withdraw)}
            className="bg-blue-500 hover:bg-blue-600 border-blue-500"
          >
            View Details
          </Button>
          {withdraw.status === 'pending' && (
            <Button 
              type="primary" 
              icon={<DollarOutlined />}
              onClick={() => showPaymentModal(withdraw)}
              className="bg-green-500 hover:bg-green-600 border-green-500"
            >
              Payment
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-auto mt-8 px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Withdraw Requests</h1>
        <p className="text-gray-600">Manage and process withdrawal requests from influencers</p>
      </div>
      
      <Card className="shadow-lg">
        <Table
          columns={columns}
          dataSource={withdrawData?.data?.attributes?.results || []}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          className="custom-table"
        />
      </Card>

      {/* Details Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <EyeOutlined className="text-blue-500" />
            <span>Withdraw Request Details</span>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedWithdraw && (
          <div className="space-y-6">
            <Card className="bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Influencer Name</p>
                  <p className="font-semibold text-gray-800">{selectedWithdraw.influencerId.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{selectedWithdraw.influencerId.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-bold text-green-600 text-xl">${selectedWithdraw.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {getStatusTag(selectedWithdraw.status)}
                </div>
              </div>
            </Card>

            <Card title="Request Details">
              <p><strong>Reason:</strong> {selectedWithdraw.reason || 'No reason provided'}</p>
            </Card>

            <Card title="Bank Details">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-semibold">{selectedWithdraw.bankDetails.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-semibold">{selectedWithdraw.bankDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Holder Name</p>
                  <p className="font-semibold">{selectedWithdraw.bankDetails.holderName}</p>
                </div>
              </div>
            </Card>

            {selectedWithdraw.status === 'approved' && selectedWithdraw.approvalNote && (
              <Card title="Approval Note" className="bg-green-50 border-green-200">
                <p className="text-green-800">{selectedWithdraw.approvalNote}</p>
              </Card>
            )}

            {selectedWithdraw.image?.url && (
              <Card title="Bank Signature">
                <img
                  src={url + selectedWithdraw.image.url}
                  alt="Bank Signature"
                  className="w-full max-w-md h-auto border rounded-lg shadow-sm"
                />
              </Card>
            )}
          </div>
        )}
      </Modal>

      {/* Payment Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <DollarOutlined className="text-green-500" />
            <span>Process Payment</span>
          </div>
        }
        visible={isPaymentModalVisible}
        onCancel={handlePaymentCancel}
        footer={null}
        width={600}
      >
        {selectedWithdraw && (
          <div className="space-y-6">
            <Card className="bg-blue-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{selectedWithdraw.influencerId.fullName}</h3>
                  <p className="text-gray-600">{selectedWithdraw.influencerId.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-bold text-green-600 text-2xl">${selectedWithdraw.amount}</p>
                </div>
              </div>
            </Card>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Note <span className="text-red-500">*</span>
              </label>
              <TextArea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                placeholder="Enter approval note for this payment..."
                rows={4}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Receipt/Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {paymentImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Selected: {paymentImage.name}</p>
                </div>
              )}
            </div>

            <Divider />

            <div className="flex justify-end space-x-3">
              <Button onClick={handlePaymentCancel}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                onClick={handlePaymentSubmit}
                className="bg-green-500 hover:bg-green-600 border-green-500"
              >
                Process Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <style jsx>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default WithdrawRequestPage;