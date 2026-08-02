import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Switch, Table, Tag, message } from "antd";
import {
  useCreatePlanMutation,
  useDeletePlanMutation,
  useGetAdminPlansQuery,
  useUpdatePlanMutation,
} from "../../../redux/features/plans/plansApi";

const PlansPage = () => {
  const { data, isLoading } = useGetAdminPlansQuery();
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const [deletePlan] = useDeletePlanMutation();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const plans = data?.data?.attributes || [];

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, durationDays: 30, currency: "eur" });
    setOpen(true);
  };

  const openEdit = (plan) => {
    setEditing(plan);
    form.setFieldsValue({
      ...plan,
      features: (plan.features || []).join(", "),
    });
    setOpen(true);
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      features: String(values.features || "")
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };
    try {
      if (editing) {
        await updatePlan({ id: editing.id || editing._id, ...payload }).unwrap();
        message.success("Plan updated");
      } else {
        await createPlan(payload).unwrap();
        message.success("Plan created");
      }
      setOpen(false);
    } catch (err) {
      message.error(err?.data?.message || "Failed to save plan");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price", render: (v, r) => `${v} ${r.currency || "eur"}` },
    { title: "Days", dataIndex: "durationDays" },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (v) => <Tag color={v ? "green" : "default"}>{v ? "Active" : "Hidden"}</Tag>,
    },
    {
      title: "Action",
      render: (_, plan) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => openEdit(plan)}>
            Edit
          </Button>
          <Button
            size="small"
            danger
            onClick={async () => {
              await deletePlan(plan.id || plan._id);
              message.success("Plan deleted");
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="page-title">Subscription plans</h1>
          <p className="page-subtitle">Manage pricing catalog shown on the website.</p>
        </div>
        <Button type="primary" onClick={openCreate}>
          Add plan
        </Button>
      </div>

      <div className="panel !p-0 overflow-hidden">
        <Table loading={isLoading} columns={columns} dataSource={plans} rowKey={(r) => r.id || r._id} />
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        title={editing ? "Edit plan" : "Create plan"}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit} className="mt-4">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber className="!w-full" min={0} />
          </Form.Item>
          <Form.Item name="durationDays" label="Duration (days)">
            <InputNumber className="!w-full" min={1} />
          </Form.Item>
          <Form.Item name="features" label="Features (comma separated)">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="isPopular" label="Popular" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlansPage;
