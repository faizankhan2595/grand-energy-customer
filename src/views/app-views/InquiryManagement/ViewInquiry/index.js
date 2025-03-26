import React , {useState,useEffect} from "react";
import { Form, Button, Modal, Col, Row, Card, Input, Select, message, DatePicker } from "antd";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import axios from "axios";
import moment from "moment";
import { useLocation, useHistory, useParams } from 'react-router-dom';
import CommentsLabel from "./CommentComponents/CommentsLabel";
import Comments from "./CommentComponents/Comments";

const ViewInquiry = () => {
    const [inquiryData, setInquiryData] = useState({});
    const params = useParams();
    const customer_id = localStorage.getItem("customer_id");
    const customer_name = localStorage.getItem("customer_name");
    const [remarks, setRemarks] = useState([
        // {
        //     createdAt: '16 Jan 2022',
        //     // comment: 'This is a dummy comment',
        //     content: 'This is a dummy comment',
        //     parent_id: null,
        //     editedLogs: [{
        //         addedByName: 'John Doe',
        //         createdAt: '16 Jan 2022',
        //         comment: 'This is a dummy reply',
        //         user: {
        //             id: 2,
        //             name: 'Reddot-User',
        //         }
                
        //     }],
        //     user: {
        //         id: 1,
        //         name: 'Reddot',
        //     }
        // },
    ]);
    const [remarksReplying, setRemarksReplying] = useState("");
    const [remarksReply, setRemarksReply] = useState([]);
    const [labelRemarksReply, setLabelRemarksReply] = useState([]);
    const [remarksModal, setRemarksModal] = useState(false);
    const [remarkCurrentData, setRemarkCurrentData] = useState("");
    const [commentsLength, setCommentsLength] = useState("");

    const getInquiryData = () =>{
        axios
          .post(
            "/api/tc/get-inquiry",
            {
              id: params.id,
            }
          )
          .then((response) => {
            let res = response.data.data;
            setInquiryData(res);
            let comments = res.comments ? JSON.parse(res.comments) : [];
            setCommentsLength(+comments.length);
            if(comments.length > 0) {
                setRemarks(
                    comments
                    .filter((item) => !item.parent_id) // Remove undefined results
                    .map((parentItem) => ({
                    ...parentItem,
                    editedLogs: comments
                        .filter((childItem) => childItem.parent_id === parentItem.id)
                        .map((item) => {
                        return {
                            ...item
                        };
                        }),
                    }))
                )
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const updateInquiry = (remark_arr) => {
        console.log(remark_arr)
        axios
        .post(
            "/api/tc/update-inquiry",
            {
                ...inquiryData,
                id: params.id,
                comments: remark_arr
            }
          )
          .then((response) => {
            if(response.data.success) {
                getInquiryData();
                message.success('Comment posted successfully')
            } else {
                message.error(response.data.message || "Something went wrong! please try again later")
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const getComments = async () => {
        try {
          getInquiryData();
          console.log('get comment func')
        } catch (error) {
          console.log(error);
        }
    };

    const postRemarks = async () => {
        if (remarkCurrentData.trim() === "") {
          message.error("Please enter comment");
          return;
        }
    
        try {
            const updated_remarks = [
                ...remarks,
                {
                    createdAt: moment().format('DD MMM YYYY hh:mm a'),
                    content: remarkCurrentData,
                    parent_id: null,
                    editedLogs: [],
                    user: {
                        id: customer_id,
                        name: customer_name,
                    }
                },
            ]
            updateInquiry(updated_remarks);
            setRemarkCurrentData("");
        } catch (err) {
          message.error("Error while posting remarks");
        }
    };

    useEffect(() => {
      getInquiryData();
    }, [])
    
    return (
        <React.Fragment>
            <Card
            title={
                <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                }}
                >
                <span
                    style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "#000",
                    }}
                >
                    Inquiry Details
                </span>
                </div>
            }
            >
                <Row align="top">
                    <Col span={12}>
                        <div
                        style={{
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                        >
                            Inquiry Date
                        </div>
                        <div>{inquiryData.date}</div>
                    </Col>
                    <Col span={12}>
                    <div
                        style={{
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                        >
                            Inquiry Type
                        </div>
                        <div>{inquiryData.type}</div>
                    </Col>
                </Row>
                
                <Row align="top" className="mt-3">
                    <Col span={24}>
                        <div
                        style={{
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                        >
                            Inquiry Description
                        </div>
                        <div>{inquiryData.description}</div>
                    </Col>
                </Row>
            </Card>

            <Card
            title={
                <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                }}
                >
                <span
                    style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "#000",
                    }}
                >
                    Comments
                </span>
                </div>
            }
            >
                <div
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: "100%",
                    }}
                >
                    <CommentsLabel
                    labelRemarksReply={labelRemarksReply}
                    setLabelRemarksReply={setLabelRemarksReply}
                    remarksReplying={remarksReplying}
                    setRemarksReplying={setRemarksReplying}
                    remarksModal={remarksModal}
                    setRemarksModal={setRemarksModal}
                    remarksArray={remarks}
                    />
                </div>

                <Input.TextArea
                    value={remarkCurrentData}
                    placeholder="Enter Comment"
                    onChange={(e) => {
                        setRemarkCurrentData(e.target.value);
                    }}
                    style={{
                    resize: "none",
                    }}
                    rows={4}
                />

                <div
                    style={{
                    textAlign: "right",
                    marginTop: "10px",
                    }}
                >
                    <Button
                    onClick={() => {
                        postRemarks();
                    }}
                    type="primary"
                    >
                    Save
                    </Button>
                </div>
            </Card>
            <div>
            <Modal
                visible={remarksModal}
                width={800}
                footer={null}
                onOk={() => {}}
                onCancel={() => {
                    setRemarksModal(false);
                    setRemarksReplying("");
                }}
            >
                <Comments
                    id={params.id}
                    getRemarks={getComments}
                    remarksReply={remarksReply}
                    setRemarksReply={setRemarksReply}
                    remarksReplying={remarksReplying}
                    setRemarksReplying={setRemarksReplying}
                    remarksModal={remarksModal}
                    setRemarksModal={setRemarksModal}
                    remarksArray={remarks}
                    setRemarksArray={setRemarks}
                    updateInquiry={updateInquiry}
                    commentsLength={commentsLength}
                />
            </Modal>
            </div>
            
        </React.Fragment>
    )
}

export default ViewInquiry