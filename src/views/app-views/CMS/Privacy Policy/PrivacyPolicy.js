import React, { useState, useEffect  } from "react";
import { Button, Card, Input, Modal } from "antd";
import { useHistory } from "react-router-dom";
import '../TermsAndConditions/TremsAndConditions.css'
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import Setting from "assets/svg/Setting.svg";
import axios from "axios";
import { content, formats, modules } from "utils/textEditorModules";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import { Successfully } from "configs/svgIcons";



const PrivacyPolicy = () => {
    const [value, setValue] = useState('');
    const [showAddedSuccess, setShowAddedSuccess] = useState(false);
    const history = useHistory();
    const tok = localStorage.getItem('token')
    const handleSave = async() => {

        await axios
        .post(
          `/api/tc/update_privacy_policy`,
          {
            'pp_content': value.toString(),
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          // console.log(response.data)
          setShowAddedSuccess(true);
          setTimeout(() => {
            setShowAddedSuccess(false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });

        await axios
          .get(
            `/api/tc/privacy_policy`,
            {},
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${tok}`
              },
            }
          )
          .then((response) => {
            let res = response.data.data;
            console.log(res)
            setValue(res)
          })
          .catch((error) => {
            console.log(error);
          });
    };

    useEffect(() => {
        axios
          .get(
            `/api/tc/privacy_policy`,
            {},
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${tok}`
              },
            }
          )
          .then((response) => {
            let res = response.data.data;
            // console.log(res)
            setValue(res)
          })
          .catch((error) => {
            console.log(error);
          });
      },[]);
    return (
        <div style={{ padding: "20px 20px 0px 20px" }}>
            <div className="d-flex justify-content-between">
                <PageHeading
                    icon={Setting}
                    title="CMS / Privacy Policy"
                />
              <div style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-4'>
                <Button onClick={handleSave} type='primary' className="px-4">Save</Button>
              </div>
            </div>
            <Card className="d-flex justify-content-center py-4">
                <div style={{maxWidth:'780px' , margin:'0px auto'}} >
                <p className="font-weight-bolder font-size-md">Privacy Policy</p>
                <ReactQuill
                    style={{ borderRadius: "12px", paddingBottom: "5%" }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    formats={formats}
                    modules={modules}
                />
                </div>
            </Card>
            <Modal
              centered
              visible={showAddedSuccess}
              footer={[null]}
              onCancel={() => {
                setShowAddedSuccess(false);
              }}
            >
              <SuccessSubmit
                icon={Successfully}
                title="Privacy Policy updated Successfully!"
                desc="Privacy Policy of Grand Energy Mobile App are updated successfully"
              />
            </Modal>
        </div>
    );
}

export default PrivacyPolicy