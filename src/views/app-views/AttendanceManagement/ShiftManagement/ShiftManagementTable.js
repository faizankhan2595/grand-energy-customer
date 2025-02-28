import { Modal, Table } from 'antd'
import { Successfully } from 'configs/svgIcons'
import React from 'react'
import { useState } from 'react'
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit'
import Action from './Action'


let data = [
    {
        key: 121,
        shiftName: 'Shift 1121',
        shiftCode: 121,
        earlyInGracePeriod: '30',
        lateInGracePeriod: '15',
        earlyOutGracePeriod: '15',
        lateOutGracePeriod: '15',
        minOtDuration: '15',
        maxOtDuration: '15',
    }
]

for (let i = 122; i < 129; i++) {
    data.push({
        key: i,
        shiftName: 'Shift 1' + i,
        shiftCode: i,
        earlyInGracePeriod: '30',
        lateInGracePeriod: '15',
        earlyOutGracePeriod: '15',
        lateOutGracePeriod: '15',
        minOtDuration: '15',
        maxOtDuration: '15',
    })

}

function ShiftManagementTable() {


    const [shiftManagementTableData, setShiftManagementTableData] = useState(data)
    const columns = [
        {
            title: 'Shift Name',
            dataIndex: 'shiftName',
        },
        {
            title: 'Shift Code',
            dataIndex: 'shiftCode',
        },
        {
            title: 'Early In Grace Period',
            dataIndex: 'earlyInGracePeriod',
        },
        {
            title: 'Late In Grace Period',
            dataIndex: 'lateInGracePeriod',
        },
        {
            title: 'Early Out Grace Period',
            dataIndex: 'earlyOutGracePeriod',
        },
        {
            title: 'Late Out Grace Period',
            dataIndex: 'lateOutGracePeriod',
        },
        {
            title: 'Min Overtime Duration',
            dataIndex: 'minOtDuration',
        },
        {
            title: 'Max Overtime Duration',
            dataIndex: 'maxOtDuration',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <Action
                        id={record.shiftCode}
                        onDelete={deleteHandler}
                    // editUser={editUser}
                    />
                )
            }
        },
    ]

    const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);

    const deleteHandler = async (shiftCode) => {
        try {
            // setIsLoading(true);
            // const res = await axios.delete(
            //   process.env.REACT_APP_BACKEND_URL + `/users/delete-user/${id}`
            // );
            // if (!res.data.success) {
            //   throw new Error(res.data.data);
            // }

            setShiftManagementTableData((prev) => prev.filter((item) => item.shiftCode !== shiftCode));
            // setLoadedUsers((prev) => prev.filter((item) => item.userId !== id));
            setShowDeletedSuccess(true)
            setTimeout(() => {
                setShowDeletedSuccess(false)
            }, 3000);
        } catch (err) {
            console.log(err.message);
        }
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const selectChangeHandler = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: selectChangeHandler,
    };

    return (
        <div>
            {/* <Button onClick={modal2}> modal</Button> */}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={shiftManagementTableData}
            // loading={isLoading}
            />
            <Modal centered visible={showDeletedSuccess} footer={[null]} onCancel={()=>{setShowDeletedSuccess(false)}}>
                <SuccessSubmit icon={Successfully} title="Shift Deleted Successfully!" desc='Shift name shift 1 deleted.' />
            </Modal>
        </div>
    );
}

export default ShiftManagementTable