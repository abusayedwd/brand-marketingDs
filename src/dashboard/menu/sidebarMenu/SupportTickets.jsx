import React, { useMemo, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Space,
  Tag,
  Input,
  Select,
  message,
} from "antd";
import {
  EyeOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  useGetSupportTicketsQuery,
  useUpdateSupportTicketMutation,
} from "../../../redux/features/support/supportApi";

const { TextArea } = Input;

const statusMeta = {
  open: { color: "orange", icon: <ClockCircleOutlined />, label: "Open" },
  in_progress: { color: "blue", icon: <SyncOutlined />, label: "In progress" },
  resolved: { color: "green", icon: <CheckCircleOutlined />, label: "Resolved" },
  closed: { color: "default", icon: <CheckCircleOutlined />, label: "Closed" },
};

const SupportTickets = () => {
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [topicFilter, setTopicFilter] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [nextStatus, setNextStatus] = useState("in_progress");

  const { data, isLoading, error, refetch } = useGetSupportTicketsQuery({
    status: statusFilter,
    topic: topicFilter,
    limit: 100,
  });
  const [updateTicket, { isLoading: saving }] = useUpdateSupportTicketMutation();

  const tickets = useMemo(
    () => data?.data?.attributes?.results || data?.data?.attributes || [],
    [data]
  );

  const openModal = (ticket) => {
    setSelected(ticket);
    setReply(ticket.adminReply || "");
    setNextStatus(ticket.status === "open" ? "in_progress" : ticket.status);
  };

  const closeModal = () => {
    setSelected(null);
    setReply("");
  };

  const handleSave = async () => {
    if (!selected?.id && !selected?._id) return;
    const id = selected.id || selected._id;
    try {
      const res = await updateTicket({
        id,
        status: nextStatus,
        adminReply: reply.trim(),
      }).unwrap();
      if (res?.code === 200) {
        message.success("Ticket updated");
        closeModal();
        refetch();
      } else {
        message.error(res?.message || "Update failed");
      }
    } catch (err) {
      message.error(err?.data?.message || "Update failed");
    }
  };

  const columns = [
    {
      title: "#",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "From",
      key: "from",
      render: (_, row) => (
        <div>
          <div className="font-semibold text-slate-800">{row.name}</div>
          <div className="text-sm text-slate-500">{row.email}</div>
        </div>
      ),
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (topic) => <Tag color="cyan">{topic}</Tag>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      render: (text) => (
        <span className="text-slate-600">{text?.slice(0, 80)}{text?.length > 80 ? "…" : ""}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const meta = statusMeta[status] || statusMeta.open;
        return (
          <Tag color={meta.color} icon={meta.icon}>
            {meta.label}
          </Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) => (d ? new Date(d).toLocaleString() : "—"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Button type="primary" icon={<EyeOutlined />} onClick={() => openModal(row)}>
          View / Reply
        </Button>
      ),
    },
  ];

  if (error) {
    return (
      <div className="panel flex h-64 items-center justify-center text-rose-500">
        Failed to load support tickets
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Support tickets</h1>
          <p className="mt-1 text-sm text-slate-500">
            Messages submitted from the website support form
          </p>
        </div>
        <Space wrap>
          <Select
            allowClear
            placeholder="Status"
            className="w-40"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "open", label: "Open" },
              { value: "in_progress", label: "In progress" },
              { value: "resolved", label: "Resolved" },
              { value: "closed", label: "Closed" },
            ]}
          />
          <Select
            allowClear
            placeholder="Topic"
            className="w-40"
            value={topicFilter}
            onChange={setTopicFilter}
            options={[
              { value: "Campaign", label: "Campaign" },
              { value: "Payment", label: "Payment" },
              { value: "Withdraw", label: "Withdraw" },
              { value: "Account", label: "Account" },
              { value: "Other", label: "Other" },
            ]}
          />
        </Space>
      </div>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={Array.isArray(tickets) ? tickets : []}
        rowKey={(row) => row.id || row._id}
        pagination={{ pageSize: 10 }}
        className="panel overflow-hidden"
      />

      <Modal
        title={
          <span className="inline-flex items-center gap-2">
            <MessageOutlined /> Support ticket
          </span>
        }
        open={!!selected}
        onCancel={closeModal}
        width={720}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Close
          </Button>,
          <Button key="save" type="primary" loading={saving} onClick={handleSave}>
            Save reply / status
          </Button>,
        ]}
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase text-slate-400">Name</div>
                <div className="font-medium">{selected.name}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-slate-400">Email</div>
                <div className="font-medium">{selected.email}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-slate-400">Topic</div>
                <Tag>{selected.topic}</Tag>
              </div>
              <div>
                <div className="text-xs uppercase text-slate-400">Submitted</div>
                <div>{selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "—"}</div>
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs uppercase text-slate-400">Message</div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm whitespace-pre-wrap">
                {selected.message}
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs uppercase text-slate-400">Status</div>
              <Select
                className="w-full"
                value={nextStatus}
                onChange={setNextStatus}
                options={[
                  { value: "open", label: "Open" },
                  { value: "in_progress", label: "In progress" },
                  { value: "resolved", label: "Resolved" },
                  { value: "closed", label: "Closed" },
                ]}
              />
            </div>

            <div>
              <div className="mb-1 text-xs uppercase text-slate-400">Admin reply</div>
              <TextArea
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply — user will get an email if possible"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportTickets;
