import React, { useState } from 'react';

import { NextPage } from 'next';
import {
  LineChart,
  XAxis,
  Tooltip,
  Line,
  YAxis,
  ResponsiveContainer,
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
  const { data } = useSWR(`/api/charts/loomi`, fetcher);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <BlankHeader openAddressModel={() => setIsAddressModalOpen(true)} />
      }
    >
      <div className="mt-12">
        <GlowyBox title="In Game Loomi Over Time" isLoading={false}>
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
                      dataKey="game_loomi"
                      stroke="#8dff1f"
                      fill="#8dff1f"
                    />
                  </LineChart>
                </ResponsiveContainer>
                {/* <h3 className="mt-6 text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
                  Bribe Pool
                </h3>
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
                      dataKey="bribes_pool"
                      stroke="#be80ff"
                      fill="#be80ff"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <h3 className="mt-6 text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
                  Bribe Claimed
                </h3>
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
                      dataKey="bribes_paid"
                      stroke="#be80ff"
                      fill="#be80ff"
                    />
                  </LineChart>
                </ResponsiveContainer> */}
              </>
            )}
          </div>
        </GlowyBox>
      </div>
    </DashboardLayout>
  );
};

export default SpendChart;
