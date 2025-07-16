import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import users from '../../../public/image/randomuser.jpg'
import './transaction.css'

import { BsInfoCircle } from 'react-icons/bs';

const Transaction = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
const dataSource = [
  {
    key: '1',
    applicationId: '12345678',
    customerName: 'abSayed',
    email: 'abc@email.com',
    address: 'Dhaka Bangladesh',
    date: '16 Apr 2024',
  },
  {
    key: '2',
    applicationId: '12345678',
    customerName: 'Bashar Islam',
    email: 'abc@email.com',
    address: 'Dhaka Bangladesh',
    date: '16 Apr 2024',
  },
  {
    key: '3',
    applicationId: '12345678',
    customerName: 'Bashar Islam',
    email: 'abc@email.com',
    address: 'Dhaka Bangladesh',
    date: '16 Apr 2024',
  },
  {
    key: '4',
    applicationId: '12345678',
    customerName: 'Bashar Islam',
    email: 'abc@email.com',
    address: 'Dhaka Bangladesh',
    date: '16 Apr 2024',
  },
  {
    key: '5',
    applicationId: '12345678',
    customerName: 'Bashar Islam',
    email: 'abc@email.com',
    address: 'Dhaka Bangladesh',
    date: '16 Apr 2024',
  },
];

const columns = [
  {
    title: '#Application ID',
    dataIndex: 'applicationId',
    key: 'applicationId',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
        <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" />
    ),
  },
];

const handleView = () => {
    // setUser(value);
    // console.log(value)
    setIsModalOpen(true);
  };


  return (
    <div className="table-container">
        <h1 className='text-header font-medium my-2'>Recent Transaction</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
       <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon
      >
      <div>
        <div style={{fontFamily:'Aldrich'}} className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">
          <img className="w-[140px] h-[140px] rounded-full my-4"   src={users} alt="" />
          <p className="text-[16px] mb-[16px]">absayed</p>
        </div>
        <div style={{fontFamily:'Aldrich'}} className="p-[20px]">
        <div className="flex justify-between border-b py-[16px]">
            <p>Full Name:</p>
            <p>
              {/* {user?.name ? user?.name : "N/A"} */}
              absayed
            </p>
          </div>
        
         
          <div className="flex justify-between border-b py-[16px] ">
            <p>Email:</p>
            <p>
              {/* {user?.email ? user?.email : "N/A"} */}
              ab@gmail.com
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Phone:</p>
            <p>
              {/* {user?.phone ? user?.phone : "N/A"} */}
              +45269875
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Date:</p>
            <p>
              {/* {user?.createdAt  ? user?.createdAt?.split("T")[0] : "N/A"} */}
              23-11-24
            </p>
          </div>
          <div className="flex justify-between items-center pt-[16px]">
            <p>address:</p>
            <p className="px-[15px] py-[10px] rounded-lg">
              {/* Regular P550 */}
              UK
            </p>
          </div>

        </div>
      </div>
      </Modal>
    </div>
  );
};

export default Transaction;
