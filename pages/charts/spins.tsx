import React, { useState } from 'react';

import { NextPage } from 'next';
import {
  LineChart,
  XAxis,
  Tooltip,
  Line,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import useSWR from 'swr';

import BlankHeader from 'components/BlankHeader/BlankHeader';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import LoadingSpinner from 'components/ui/LoadingSpinner/LoadingSpinner';
import formatNumber from 'lib/formatNumber';
import fetcher from 'services/swrFetcher';

type IProps = {};

const SpendChart: NextPage<IProps> = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const { data } = useSWR(`/api/charts/spins`, fetcher);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <BlankHeader openAddressModel={() => setIsAddressModalOpen(true)} />
      }
    >
      <div className="mt-12">
        <GlowyBox title="Mystery Boxes" isLoading={false}>
          <div className="p-8">
            {!data && <LoadingSpinner />}
            {data && (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    height={200}
                    data={data.data}
                    syncId="anyId"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="date" stroke="#8dff1f" />
                    <YAxis
                      stroke="#8dff1f"
                      width={80}
                      tickFormatter={(tick) => formatNumber(tick, 2)}
                    />
                    <Tooltip
                      formatter={(value: any) => [formatNumber(value, 2)]}
                      contentStyle={{
                        backgroundColor: '#0b302b',
                        color: '#8dff1f',
                        border: '1px solid #000',
                        borderRadius: '15px',
                        fontWeight: 'normal',
                      }}
                    />
                    <Line
                      type="monotone"
                      name="Spins"
                      dataKey="spins"
                      stroke="#8dff1f"
                      fill="#8dff1f"
                    />
                    <Line
                      type="monotone"
                      name="Sacrifices"
                      dataKey="sacrifices"
                      stroke="#be80ff"
                      fill="#be80ff"
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </GlowyBox>
      </div>
    </DashboardLayout>
  );
};

export default SpendChart;
