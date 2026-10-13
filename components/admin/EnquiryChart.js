"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EnquiryChart({ data }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="enquiryFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#173f35"
                stopOpacity={0.25}
              />

              <stop
                offset="95%"
                stopColor="#173f35"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#64748b",
            }}
          />

          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#64748b",
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              boxShadow:
                "0 12px 30px rgba(0,0,0,.08)",
            }}
          />

          <Area
            type="monotone"
            dataKey="enquiries"
            stroke="#173f35"
            strokeWidth={3}
            fill="url(#enquiryFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}