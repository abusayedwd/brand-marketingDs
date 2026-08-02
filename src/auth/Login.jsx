import { Button, Checkbox, Form, Input } from "antd";
import signin from "../../public/image/signin.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { useAdminLoginMutation } from "../redux/features/auth/login";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const onFinish = async (values) => {
    if (!isChecked) {
      setCheckboxError("Please confirm you are an authorized admin.");
      return;
    }

    try {
      const res = await adminLogin(values).unwrap();
      if (res?.code == 200) {
        toast.success(res?.message || "Login successful");
        localStorage.setItem("user", JSON.stringify(res?.data?.attributes));
        localStorage.setItem("token", res?.data?.attributes?.tokens?.access?.token);
        setTimeout(() => navigate("/dashboard/home"), 800);
      }
    } catch (err) {
      setError(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Toaster />
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lift md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-ink-900 md:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_40%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                InfluencerAd
              </p>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight">
                Manage brands, creators & campaigns from one console.
              </h1>
              <p className="mt-3 max-w-sm text-sm text-slate-300">
                Track earnings, approve withdrawals, and keep your marketplace healthy.
              </p>
            </div>
            <img
              src={signin}
              alt="Admin sign in"
              className="mt-8 max-h-64 w-full rounded-2xl object-cover opacity-90"
            />
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            Admin sign in
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your credentials to continue
          </p>

          <Form
            name="admin_login"
            layout="vertical"
            onFinish={onFinish}
            className="mt-8"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                size="large"
                placeholder="admin@example.com"
                prefix={<HiOutlineMailOpen className="mr-1 text-accent" />}
                className="!rounded-xl"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                size="large"
                placeholder="••••••••"
                prefix={<BiLock className="mr-1 text-accent" />}
                className="!rounded-xl"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                  if (e.target.checked) setCheckboxError("");
                }}
              >
                I am an authorized administrator
              </Checkbox>
              {checkboxError && (
                <p className="mt-1 text-sm text-rose-500">{checkboxError}</p>
              )}
            </Form.Item>

            {error && <p className="mb-3 text-sm font-medium text-rose-500">{error}</p>}

            <Button
              htmlType="submit"
              loading={isLoading}
              type="primary"
              size="large"
              className="!h-12 !w-full !rounded-xl !text-base"
            >
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
