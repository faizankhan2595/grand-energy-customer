import React , {useState, useEffect} from 'react'

import {Input, Table , Button, Tag, Modal, Radio, message} from 'antd';
import Icon from '@ant-design/icons'
import { WhatsappIcon } from 'assets/svg/icon';
import Actions from './Actions';
import axios from 'axios';
import moment from 'moment';

const { TextArea } = Input;


// const data = [
//   {
//     key: 1,
//     inquiryId: "GE-123456",
//     userName: "John Smith",
//     phoneNumber: "+65 123456789",
//     emailId: "johnsmith@gmail.com",
//     dateOfInquiry: "20/08/22",
//     assignedTo: "Wade Warren",
//     inquiryChanel: WhatsappIcon,
//     status: "closed",
//   }
// ];

const InquiryListTable = ({allInquiries, setAllInquiries, setPage, searchText, selectedFilter, selectedInquiryModeFilter, selectedStatusFilter }) => {
  // const [selectedRowKeys , setSelectedRowKeys] = useState([]);
  const [inquiryData, setInquiryData] = useState({});
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [status, setStatus] = useState("Open");
  const [remark, setRemark] = useState(false);
  const columns = [
    {
      title: 'Inquiry Id',
      dataIndex: 'id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.customer_name - b.customer_name,
    },
    {
      title: 'Inquiry Date',
      dataIndex: 'dateOfInquiry',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.dateOfInquiry - b.dateOfInquiry,
    },
    {
      title: 'Status',
      dataIndex: 'status',
     render: (status) => {
        if(!status) status = 'Open'
        return(
          <span>
            {status == 'Open' && <Tag color="green" key={status}>
              {status}
            </Tag>}
            {status == 'Closed' && <Tag color="red" key={status}>
              {status}
            </Tag>}
          </span>
        )
      }
    },
    {
      title:"Action",
      dataIndex: "action",
      render: (_,record) => {
        return (
          <Actions setInquiryData={setInquiryData} inquiryData={record}  setOpenStatusModal={setOpenStatusModal} inquiry_id={record.id}/>
        )
      }
    }
      
      
  ];

  const handleStatusOk = () => {
    console.log(inquiryData);
    axios
    .post(
      "/api/tc/update-inquiry",
      {
        ...inquiryData,
        id: inquiryData.id,
        // tc_customer_id: inquiryData.customer_id,
        status: status,
 comments: JSON.parse(inquiryData.comments),
      },
    )
    .then((response) => {
      let res = response.data;
      console.log(res);
      setOpenStatusModal(false);
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
      
  };
  const handleStatusCancel = () => {
      setStatus("")
      setRemark("")
      setOpenStatusModal(false);
  };

  useEffect(() => {
    getData();
  }, [searchText]);

  useEffect(() => {
    getData()
  }, [selectedFilter]);


  const getData = () => {
    axios
      .post(
        "/api/tc/get-inquiries",
        {
          page_index: 1,
          page_size: 10,
          statuses: null,
          search: searchText ? searchText : null,
          inquiry_mode: selectedInquiryModeFilter || null,
          status: selectedStatusFilter || null,
        },
      )
      .then((response) => {
        let res = response.data.data.data;
        // console.log(res);

        let fdata = res.map((elem, ind) => {
          return {
            ...elem,
            sr_no: ind+1,
            key: elem.id,
            id: elem.id,
            customer_name: elem.customer_name || elem.tc_customer_id,
            email: elem.email || '-',
            mobile: elem.mobile || '-',
            dateOfInquiry: moment(elem.created_at).format("DD-MM-YYYY"),
            status: elem.status,
          };
        });
        setAllInquiries(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  return (
    <div className='mt-3'>
      {/* <Table rowSelection={rowSelection} columns={columns} dataSource={data} className="w-100"/> */}
      <Table columns={columns} dataSource={allInquiries} className="w-100"/>

      <Modal
        visible={openStatusModal}
        centered
        maskClosable
        onCancel={() => {setOpenStatusModal(false);}}
        title={'Inquiry Status'}
        footer={[
            <Button key={'submit'} style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold' onClick={handleStatusOk}>Save</Button>,
            <Button key={'cancel'} style={{ color: '#000B23' }} onClick={handleStatusCancel} className='font-weight-bold'>Cancel</Button>,
        ]}
        >   
        <div>
            <Radio.Group
                size="small" 
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={"Open"}
            >
                <Radio value="Open" defaultChecked> Open </Radio>
                <Radio value="Closed"> Close</Radio>
            </Radio.Group>
        </div>

        <div>
            <h4 className="mb-2 mt-4">Remarks</h4>
            <TextArea rows={4} onChange={(e) => setRemark(e.target.value)} value={remark} />
        </div>
      </Modal>
    </div>
  )
}

export default InquiryListTable