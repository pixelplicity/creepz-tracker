import { formatInTimeZone } from 'date-fns-tz';
import eachHourOfInterval from 'date-fns/eachHourOfInterval';
import parseISO from 'date-fns/parseISO';
import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'services/supabase/client';

export type Response = {
  error?: string;
  data?: any[];
};
const getPageData = async (offset: number): Promise<Response> => {
  const dataResponse = await supabase
    .from('mystery_box_activity')
    .select()
    .order('date', { ascending: false })
    .range(offset, offset + 1000);
  if (dataResponse.error) {
    console.error(dataResponse.error);
    return { error: dataResponse.error.message };
  }
  return {
    data: dataResponse.data,
  };
};
const getAllData = async (): Promise<Response> => {
  let allData: any = [];
  let keepGoing = true;
  let offset: number = 0;
  while (keepGoing) {
    const response = await getPageData(offset); //eslint-disable-line
    allData = [...allData, ...(response.data || [])];
    if (response && response.data && response.data?.length >= 1000) {
      offset += 1000;
    } else {
      keepGoing = false;
      return {
        data: allData,
      };
    }
  }
  return {
    data: [],
  };
};

export const getData = async (): Promise<Response> => {
  const allData = await getAllData();
  if (allData.data) {
    const startDate = parseISO(allData.data[allData.data.length - 1].date);
    const endDate = parseISO(allData.data[0].date);
    const hourlyIntervals = eachHourOfInterval({
      start: startDate,
      end: endDate,
    });
    const groupedData = [];
    for (let i = 0; i < hourlyIntervals.length; i += 1) {
      const dataPoints = (allData.data ? allData.data : []).filter(
        (dataPoint) => {
          const date = parseISO(dataPoint.date);
          if (i + 1 === hourlyIntervals.length) {
            const compare = hourlyIntervals[i] as Date;
            return date >= compare;
          }
          const startOfInterval = hourlyIntervals[i] as Date;
          const endOfInterval = hourlyIntervals[i + 1] as Date;
          if (hourlyIntervals[i] && hourlyIntervals[i + 1]) {
            return date >= startOfInterval && date <= endOfInterval;
          }
          return false;
        }
      );
      const spins = dataPoints
        .filter((d) => d.action === 'spin')
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);
      const sacrifices = dataPoints
        .filter((d) => d.action === 'sacrifice')
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);
      const date = hourlyIntervals[i] as Date;
      const strDate = date.toISOString();
      groupedData.push({
        date: formatInTimeZone(
          parseISO(strDate),
          'America/New_York',
          'MMM d p'
        ),
        spins,
        sacrifices,
      });
    }
    return {
      data: groupedData,
    };
  }
  return {
    data: [],
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cacheKey = `charts-spins`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 5;
  const response = await getData();
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
