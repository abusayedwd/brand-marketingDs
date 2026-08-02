import React, { useMemo, useState } from "react";
import { Table, Button, Space, Input, Tag, message } from "antd";
import { useContentCreatorQuery } from "../../../redux/features/users/contentCreator";
import { useModerateUserMutation } from "../../../redux/features/users/moderateUser";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import DetailsModal, { DetailItem } from "../../../components/DetailsModal";
import url from "../../../redux/api/baseUrl";

const ContentCreatorListPage = () => {
  const { data: contentCreator, isLoading, error, refetch } = useContentCreatorQuery();
  const [moderateUser] = useModerateUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [search, setSearch] = useState("");

  const moderate = async (id, body) => {
    try {
      await moderateUser({ id, ...body }).unwrap();
      message.success("User updated");
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Moderation failed");
    }
  };

  const creators = contentCreator?.data?.attributes?.results || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return creators;
    return creators.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phoneNumber?.toLowerCase().includes(q)
    );
  }, [creators, search]);

  const renderPlatformIcon = (platform) => {
    switch (platform) {
      case "Facebook":
        return <FacebookOutlined className="text-blue-600" />;
      case "Instagram":
        return <InstagramOutlined className="text-pink-600" />;
      case "Twitter":
        return <TwitterOutlined className="text-sky-500" />;
      case "YouTube":
        return <YoutubeOutlined className="text-red-600" />;
      default:
        return <span className="text-xs text-slate-500">{platform}</span>;
    }
  };

  const columns = [
    { title: "#", width: 60, render: (_, __, index) => index + 1 },
    {
      title: "Creator",
      key: "creator",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row?.image?.url ? url + row.image.url : "/image/logo.png"}
            alt=""
            className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div>
            <p className="font-semibold text-ink-800">{row.fullName}</p>
            <p className="text-xs text-slate-500">@{row.userName || "creator"}</p>
          </div>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Platforms",
      dataIndex: "socialMedia",
      key: "socialMedia",
      render: (socialMedia = []) => (
        <div className="flex flex-wrap gap-2">
          {socialMedia.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg"
            >
              {renderPlatformIcon(platform.platform)}
            </a>
          ))}
        </div>
      ),
    },
    {
      title: "Plan",
      key: "subscription",
      render: (_, row) => (
        <Tag color={row?.isSubscribe ? "green" : "default"}>
          {row?.subscriptionId?.planName || row?.planName || "No plan"}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "moderation",
      render: (_, row) => (
        <Space wrap>
          {row.isBanned && <Tag color="red">Banned</Tag>}
          {row.isSuspended && <Tag color="orange">Suspended</Tag>}
          {row.isEmailVerified && <Tag color="green">Verified</Tag>}
          {!row.isBanned && !row.isSuspended && <Tag>Active</Tag>}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, influencer) => (
        <Space wrap>
          <Button
            type="primary"
            onClick={() => {
              setSelectedInfluencer(influencer);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
          <Button
            size="small"
            onClick={() =>
              moderate(influencer.id || influencer._id, {
                isSuspended: !influencer.isSuspended,
                moderationNote: influencer.isSuspended ? "Suspension lifted" : "Suspended by admin",
              })
            }
          >
            {influencer.isSuspended ? "Unsuspend" : "Suspend"}
          </Button>
          <Button
            size="small"
            danger={!influencer.isBanned}
            onClick={() =>
              moderate(influencer.id || influencer._id, {
                isBanned: !influencer.isBanned,
                moderationNote: influencer.isBanned ? "Ban lifted" : "Banned by admin",
              })
            }
          >
            {influencer.isBanned ? "Unban" : "Ban"}
          </Button>
          {!influencer.isEmailVerified && (
            <Button
              size="small"
              onClick={() =>
                moderate(influencer.id || influencer._id, { isEmailVerified: true })
              }
            >
              Verify
            </Button>
          )}
        </Space>
      ),
    },
  ];

  if (error) {
    return <div className="panel text-rose-600">Failed to load creators.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Content creators</h1>
          <p className="page-subtitle">{filtered.length} influencers registered</p>
        </div>
        <Input.Search
          allowClear
          placeholder="Search creators"
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="panel !p-0 overflow-hidden">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={filtered}
          rowKey={(r) => r.id || r._id}
          pagination={{ pageSize: 8 }}
        />
      </div>

      <DetailsModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedInfluencer(null);
        }}
        title={selectedInfluencer?.fullName || "Creator details"}
        subtitle={selectedInfluencer?.email}
        badge={selectedInfluencer?.isBanned ? "Banned" : selectedInfluencer?.isSuspended ? "Suspended" : "Active"}
      >
        {selectedInfluencer && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <img
                src={
                  selectedInfluencer?.image?.url
                    ? url + selectedInfluencer.image.url
                    : "/image/logo.png"
                }
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="font-display text-lg font-semibold">{selectedInfluencer.fullName}</p>
                <p className="text-sm text-slate-500">@{selectedInfluencer.userName || "creator"}</p>
              </div>
            </div>
            <div className="detail-grid">
              <DetailItem label="Phone" value={selectedInfluencer.phoneNumber} />
              <DetailItem
                label="Plan"
                value={
                  selectedInfluencer.subscriptionId?.planName ||
                  selectedInfluencer.planName ||
                  "No plan"
                }
              />
              <DetailItem
                label="Interests"
                value={selectedInfluencer.interests?.join(", ") || "—"}
              />
              <DetailItem label="Address" value={selectedInfluencer.address || "—"} />
            </div>
            <div className="detail-item">
              <div className="label">Bio</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {selectedInfluencer.bio || "No bio added."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(selectedInfluencer.socialMedia || []).map((platform, index) => (
                <a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink-800 hover:border-accent"
                >
                  {platform.platform} · {platform.followers || 0}
                </a>
              ))}
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default ContentCreatorListPage;
