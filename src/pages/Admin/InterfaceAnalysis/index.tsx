import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
// @ts-ignorenpm install echarts
import ReactECharts from 'echarts-for-react';
import {listTopInvokeInterfaceInfoUsingGet} from "@/services/yuapi-backend/analysisController";

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {

  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
 // const [loading,setLoading]=useState(true);
  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGet().then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
    } catch (e: any) {

    }
    // todo 从远程获取数据
  }, [])

  // 映射：{ value: 1048, name: 'Search Engine' },
  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })

  const option = {
    title: {
      text: '调用次数最多的接口TOP3',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        // data:[
        //   {value: 1048,name: 'WEI'},
        //   {value: 177,name: 'Direct'},
        //   {value: 580,name: 'Email'},
        //   {value: 300,name: 'Video Ads'}
        // ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <PageContainer>
      {/*<ReactECharts loadingOption={{*/}
      {/*  showLoading: loading*/}
      {/*}}*/}
      {/*              option={{option}}/>*/}
      <ReactECharts option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
