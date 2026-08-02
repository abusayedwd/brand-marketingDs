import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Avatar, Modal, Form, Input, Button } from "antd";
import { DownOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useState } from "react";
import { useLogedUserQuery } from "../redux/features/users/logedUser";
import url from "./../redux/api/baseUrl";
import { useChangPasswordMutation } from "../redux/features/auth/changePassword";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const { data: adminm } = useLogedUserQuery();
  const admin = adminm?.data?.attributes;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordChange] = useChangPasswordMutation();

  const handleLogOut = () => {
    Swal.fire({
      title: "Log out?",
      text: "You will need to sign in again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F766E",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  const changePassword = async (values) => {
    const { confirmPassword, ...ChangePassword } = values;
    try {
      const res = await passwordChange(ChangePassword).unwrap();
      if (res?.code == 200) {
        setIsModalOpen(false);
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/dashboard/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Change Password
        </button>
      </Menu.Item>
      <Menu.Item key="3">
        <button type="button" onClick={handleLogOut}>
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-soft backdrop-blur sm:px-5">
      <Toaster />
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
          Admin Panel
        </p>
        <h1 className="font-display text-lg font-semibold text-ink-900 sm:text-xl">
          Welcome{admin?.fullName ? `, ${admin.fullName}` : ""}
        </h1>
      </div>

      <Dropdown overlay={menu} trigger={["click"]}>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-surface-muted px-2 py-1.5 transition hover:border-accent/40"
        >
          <Avatar
            src={admin?.image?.url ? url + admin.image.url : undefined}
            className="!bg-accent"
          >
            {admin?.fullName?.[0] || "A"}
          </Avatar>
          <span className="hidden text-sm font-medium text-ink-700 sm:inline">
            {admin?.fullName || "Admin"}
          </span>
          <DownOutlined className="text-xs text-slate-400" />
        </button>
      </Dropdown>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Change Password"
      >
        <Form layout="vertical" onFinish={changePassword} className="mt-4">
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: "Enter old password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Enter new password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Confirm new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="!h-10">
            Update Password
          </Button>
        </Form>
      </Modal>
    </header>
  );
};

export default Header;
