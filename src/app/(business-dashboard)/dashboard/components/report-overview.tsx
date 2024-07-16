"use client";

import { curveCardinal } from "d3-shape";
import React, { PureComponent } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Button } from "components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

import { Typography } from "components/ui/Typography";
import CardContainer from "./card-container";

const data = [
  {
    name: "Jan",
    uv: 100,
    pv: 100,
    amt: 100,
  },
  {
    name: "Feb",
    uv: 200,
    pv: 198,
    amt: 200,
  },
  {
    name: "Mar",
    uv: 200,
    pv: 180,
    amt: 229,
  },
  {
    name: "Apr",
    uv: 278,
    pv: 190,
    amt: 200,
  },
  {
    name: "May",
    uv: 189,
    pv: 200,
    amt: 218,
  },
  {
    name: "Jun",
    uv: 350,
    pv: 380,
    amt: 250,
  },
  {
    name: "Jul",
    uv: 340,
    pv: 330,
    amt: 210,
  },

  {
    name: "Aug",
    uv: 300,
    pv: 380,
    amt: 220,
  },
  {
    name: "Sept",
    uv: 370,
    pv: 390,
    amt: 200,
  },
  {
    name: "Oct",
    uv: 480,
    pv: 480,
    amt: 281,
  },
  {
    name: "Nov",
    uv: 390,
    pv: 380,
    amt: 250,
  },
  {
    name: "Dec",
    uv: 420,
    pv: 430,
    amt: 210,
  },
];

const cardinal = curveCardinal.tension(-1);

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/area-chart-different-shapes-z94k6";

  render() {
    return (
      <CardContainer>
        <Tabs defaultValue="12months" className="w-full space-y-32">
          <div className="flex items-center justify-between w-full">
            <Typography level="CT" className="text-gray-900">
              Report overview
            </Typography>

            <TabsList>
              <TabsTrigger value="12months">12 Months</TabsTrigger>
              <TabsTrigger value="6months">6 Months</TabsTrigger>
              <TabsTrigger value="30days">30 Days</TabsTrigger>
              <TabsTrigger value="7days">7 Days</TabsTrigger>
            </TabsList>

            <Button className="border-spacing-1.5 border border-gray-300 bg-white font-CenturyGothic text-[11px] font-bold text-gray-900">
              Export PDF
            </Button>
          </div>

          <TabsContent value="12months">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <Tooltip />
                <Area
                  type={cardinal}
                  dataKey="pv"
                  stroke="#6CC6EB"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type={cardinal}
                  dataKey="uv"
                  stroke="#23AAE1"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="6months">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <Tooltip />
                <Area
                  type={cardinal}
                  dataKey="pv"
                  stroke="#6CC6EB"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type={cardinal}
                  dataKey="uv"
                  stroke="#23AAE1"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="30days">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <Tooltip />
                <Area
                  type={cardinal}
                  dataKey="pv"
                  stroke="#6CC6EB"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type={cardinal}
                  dataKey="uv"
                  stroke="#23AAE1"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="7days">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <Tooltip />
                <Area
                  type={cardinal}
                  dataKey="pv"
                  stroke="#6CC6EB"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type={cardinal}
                  dataKey="uv"
                  stroke="#23AAE1"
                  fill="#BFEFFF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContainer>
    );
  }
}
