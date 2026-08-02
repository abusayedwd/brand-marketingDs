import React, { useMemo, useState } from "react";
import { Table, Button, Space, Input, Tag } from "antd";
import { useGetAllCampaignQuery } from "../../../redux/features/campaign/getAllcampaign";
import url from "./../../../redux/api/baseUrl";
import DetailsModal, { DetailItem } from "../../../components/DetailsModal";

const statusColor = {
  pending: "gold",
  upComming: "blue",
  active: "green",
  completed: "default",
};

const CampaignListPage = () => {
  const { data: campaignData, isLoading, error } = useGetAllCampaignQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [search, setSearch] = useState("");

  const campaigns = campaignData?.data?.attributes?.results || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return campaigns;
    return campaigns.filter(
      (c) =>
        c.campaignName?.toLowerCase().includes(q) ||
        c.status?.toLowerCase().includes(q)
    );
  }, [campaigns, search]);

  const columns = [
    { title: "#", width: 60, render: (_, __, index) => index + 1 },
    {
      title: "Campaign",
      dataIndex: "campaignName",
      render: (name, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image ? url + row.image : "/image/logo.png"}
            alt=""
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200"
          />
          <div>
            <p className="font-semibold text-ink-800">{name}</p>
            <p className="line-clamp-1 text-xs text-slate-500">{row.description}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={statusColor[status] || "default"} className="!capitalize">
          {status === "upComming" ? "Upcoming" : status}
        </Tag>
      ),
    },
    { title: "Budget", dataIndex: "budget", render: (v) => `$${v ?? 0}` },
    { title: "Influencers", dataIndex: "influencerCount" },
    { title: "Total", dataIndex: "totalAmount", render: (v) => `$${v ?? 0}` },
    {
      title: "Action",
      render: (_, campaign) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setSelectedCampaign(campaign);
              setIsModalVisible(true);
            }}
          >
            Details
          </Button>
        </Space>
      ),
    },
  ];

  if (error) {
    return <div className="panel text-rose-600">Failed to load campaigns.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Campaigns</h1>
          <p className="page-subtitle">
            {filtered.length} campaign{filtered.length !== 1 ? "s" : ""} on the platform
          </p>
        </div>
        <Input.Search
          allowClear
          placeholder="Search by name or status"
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
          setSelectedCampaign(null);
        }}
        title={selectedCampaign?.campaignName || "Campaign details"}
        subtitle="Full campaign overview"
        badge={
          selectedCampaign?.status === "upComming"
            ? "Upcoming"
            : selectedCampaign?.status
        }
      >
        {selectedCampaign && (
          <div className="space-y-4">
            {selectedCampaign.image && (
              <img
                src={url + selectedCampaign.image}
                alt="Campaign"
                className="h-52 w-full rounded-2xl object-cover"
              />
            )}
            <div className="detail-grid">
              <DetailItem label="Budget" value={`$${selectedCampaign.budget ?? 0}`} />
              <DetailItem label="Total amount" value={`$${selectedCampaign.totalAmount ?? 0}`} />
              <DetailItem label="Influencer slots" value={selectedCampaign.influencerCount} />
              <DetailItem
                label="Platforms"
                value={selectedCampaign.selectedPlatforms?.join(", ") || "—"}
              />
              <DetailItem
                label="Start"
                value={
                  selectedCampaign.startDate
                    ? new Date(selectedCampaign.startDate).toLocaleDateString()
                    : "—"
                }
              />
              <DetailItem
                label="End"
                value={
                  selectedCampaign.endDate
                    ? new Date(selectedCampaign.endDate).toLocaleDateString()
                    : "—"
                }
              />
            </div>
            <div className="detail-item">
              <div className="label">Description</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {selectedCampaign.description || "No description provided."}
              </p>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default CampaignListPage;
