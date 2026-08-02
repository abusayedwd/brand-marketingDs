import { Button, Form, Input, Upload, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import "react-phone-number-input/style.css";
import defaultUserImage from "../../../../public/image/randomuser.jpg";
import { useLogedUserQuery } from "../../../redux/features/users/logedUser";
import url from "../../../redux/api/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateAdminMutation } from "../../../redux/features/users/updateAdmin";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(defaultUserImage);
  const { data: profile, isLoading } = useLogedUserQuery();
  const user = profile?.data?.attributes;
  const id = user?.id;
  const [updateProfile, { isLoading: saving }] = useUpdateAdminMutation();

  useEffect(() => {
    if (!user) return;
    form.setFieldsValue({
      name: user.fullName || "",
      email: user.email || "",
    });
    setPhoneNumber(user.phoneNumber || "");
    if (user.image?.url) {
      setImageUrl(`${url}${user.image.url}`);
    }
  }, [user, form]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => setImageUrl(reader.result);
    }
  };

  const handleUpdateProfile = async (values) => {
    const formData = new FormData();
    formData.append("fullName", values?.name);
    formData.append("phoneNumber", phoneNumber || "");
    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const res = await updateProfile({ formData, id }).unwrap();
      if (res?.code === 200) {
        toast.success(res?.message || "Profile updated");
        setTimeout(() => navigate("/dashboard/profile"), 800);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  if (isLoading || !user) {
    return (
      <div className="panel flex h-64 items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="page-shell space-y-6">
      <Toaster position="top-right" />

      <button
        type="button"
        onClick={() => navigate("/dashboard/profile")}
        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-teal-700"
      >
        <MdOutlineKeyboardArrowLeft size={22} />
        Back to profile
      </button>

      <div>
        <h1 className="page-title">Edit profile</h1>
        <p className="page-subtitle">Update your admin name, phone, and photo</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleUpdateProfile}
        requiredMark={false}
        className="panel"
      >
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex w-full flex-col items-center lg:w-72">
            <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <img
                className="h-full w-full object-cover"
                src={imageUrl}
                alt="Profile"
              />
            </div>
            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              className="mt-4"
            >
              <Button
                icon={<LuImagePlus size={18} />}
                className="!h-10 !rounded-xl !border-teal-200 !text-teal-800"
              >
                Change picture
              </Button>
            </Upload>
            <p className="mt-3 text-xs capitalize text-slate-500">{user.role}</p>
            <p className="font-display text-lg font-semibold text-ink-900">
              {user.fullName}
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <Form.Item
              label="Full name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input size="large" placeholder="Full name" className="!rounded-xl" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input
                size="large"
                readOnly
                className="!rounded-xl !bg-slate-50"
              />
            </Form.Item>

            <div className="mb-6">
              <label className="mb-2 block text-sm text-slate-700">Phone number</label>
              <PhoneInput
                placeholder="Enter phone number"
                international
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="admin-phone-input rounded-xl border border-slate-200 px-3 py-2"
              />
            </div>

            <Button
              htmlType="submit"
              loading={saving}
              className="!h-11 !w-full !rounded-xl !border-0 !bg-teal-700 !text-sm !font-semibold !text-white hover:!bg-teal-600 sm:!w-auto sm:!px-10"
            >
              Save changes
            </Button>
          </div>
        </div>
      </Form>

      <style>{`
        .admin-phone-input .PhoneInputInput {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default EditProfile;
