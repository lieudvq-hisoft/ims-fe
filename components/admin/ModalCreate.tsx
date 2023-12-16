import React, { useRef, useState } from "react";
import { Button, Input, Modal, Select, Space, Card } from "antd";
import { Form } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { UserCreateModel } from "@models/user";
import useSelector from "@hooks/use-selector";
const { Option } = Select;
const { confirm } = Modal;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (uCreateModel: UserCreateModel) => void;
}

const ModalCreate: React.FC<Props> = (props) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { onSubmit, open, onClose } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { componentOptions } = useSelector((state) => state.component);

  const disabled = async () => {
    var result = false;
    try {
      await form.validateFields();
    } catch (errorInfo) {
      result = true;
    }
    return result;
  };

  return (
    <>
      <Modal
        title={
          <span className="inline-block m-auto">Create staff account</span>
        }
        open={open}
        confirmLoading={confirmLoading}
        onCancel={() => {
          onClose();
          form.resetFields();
        }}
        footer={[
          <Button
            className="btn-submit"
            key="submit"
            onClick={async () => {
              if (!(await disabled()))
                confirm({
                  title: "Do you want to save?",
                  async onOk() {
                    const formData = {
                        userName: form.getFieldValue("userName"),
                        password: "P@ssword123",
                        email: form.getFieldValue("email"),
                        fullname: form.getFieldValue("fullname"),
                        address: form.getFieldValue("address"),
                        phoneNumber: form.getFieldValue("phoneNumber"),
                        roles: form.getFieldValue('roles').map((role => role.roleName)),
                    };

                    // Call the provided onSubmit function with the formData
                    onSubmit(formData);
                    //form.resetFields();
                  },
                  onCancel() { },
                });
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="flex max-w-md flex-col gap-4 m-auto">
          <Form
            ref={formRef}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            name="dynamic_form_complex"
          >
            <Form.Item
                label="Username"
                name="userName"
                rules={[
                    { required: true, message: 'Please enter staff username'}, 
                    { min: 6, max: 255, message: 'Username must be between 6 and 255 characters ' },
                    ({ getFieldValue }) => ({
                      validator(_, userName) {
                        const hasDescriptions = getFieldValue('roles')?.length > 0;
                        if (!hasDescriptions) {
                          return Promise.reject('At least one roles is required for the account.');
                        }    
                        return Promise.resolve();
                      },
                    }),
                ]}
            >
                <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    allowClear
                    placeholder="Username"
                    />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter staff email address' },
                    {
                      pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                      message: 'Please enter a valid email address',
                    },
                    {
                      min: 6,
                      max: 255,
                      message: 'Email must be between 6 and 255 characters',
                    },
                  ]}
            >
                <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    allowClear
                    placeholder="Email"
                    />
            </Form.Item>
            <Form.Item
                label="Fullname"
                name="fullname"
                rules={[
                  { required: true, message: 'Please enter staff fullname' },
                  { min: 6, max: 255, message: 'Name must be between 6 and 255 characters' }
                ]}
            >
                <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    allowClear
                    placeholder="Fullname"
                    />
            </Form.Item>            
            <Form.Item
                label="Address"
                name="address"
                rules={[ 
                  { required: true, message: 'Please enter staff address' },
                  { min: 6, max: 255, message: 'Address must be between 6 and 255 characters' },                    
                ]}
            >
                <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    allowClear
                    placeholder="Address"
                    />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[ 
                  { required: true, message: 'Please enter staff phone number' },
                  {
                      pattern: /^(0|84)(2(0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[0-9]|5[124-9]|6[0369]|7[0-7]|8[0-9]|9[012346789])|3[2-9]|5[25689]|7[06-9]|8[0-9]|9[012346789])([0-9]{7})$/gm,
                      message: 'Please enter a valid phone number',
                  },
                ]}
            >
                <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    allowClear
                    placeholder="Phone Number"
                    />
            </Form.Item>            
            <Form.List name="roles">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map((field) => (
                    <Card
                      size="small"
                      title={`Role ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                        <Form.Item
                            label="Role"
                            name={[field.name, 'roleName']}
                            rules={[
                                { required: true },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    // Check if the role in the current field is different from the previous one
                                        const roles = getFieldValue('roles').map((roleField) => roleField.role);
                                        const isRoleUnique = roles.indexOf(value) === roles.lastIndexOf(value);

                                        if (!isRoleUnique) {
                                            return Promise.reject(new Error('All roles must be unique'));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                              ]}
                        >
                            <Select
                                placeholder="Select a role"
                                allowClear
                            >
                                <Select.Option value="Sale">Sales Staff</Select.Option>
                                <Select.Option value="Tech">Technical Staff</Select.Option>
                                <Select.Option value="Admin">Admin</Select.Option>
                            </Select>
                        </Form.Item>
                    </Card>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Role
                  </Button>
                </div>
              )}
            </Form.List>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;