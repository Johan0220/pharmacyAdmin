import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import dynamic from 'next/dynamic';
const MonthCV = (props: any) => {
   const data = props.data;
   let chart:any;
   let totalMonth = data?.numberCVCheckedMonth + data?.numberCVQualifiedMonth + data?.numberCVSubmittedMonth + data?.numberCVUnQualifiedMonth;
   let percentCVSubmittedMonth = Number(totalMonth ? ((data.numberCVSubmittedMonth / totalMonth) * 100).toFixed(2) : 0);
   let percentCVCheckedMonth = Number(totalMonth ? ((data.numberCVCheckedMonth / totalMonth) * 100).toFixed(2) : 0);
   let percentCVQualifiedMonth = Number(totalMonth ? ((data.numberCVQualifiedMonth / totalMonth) * 100).toFixed(2) : 0);
   let percentCVUnQualifiedMonth = Number(totalMonth ? ((data.numberCVUnQualifiedMonth / totalMonth) * 100).toFixed(2) : 0);
   useEffect(()=>{
      if(data !== undefined){
         const getChartOptions = () => {
            return {
               series: [percentCVSubmittedMonth, percentCVCheckedMonth, percentCVQualifiedMonth, percentCVUnQualifiedMonth],
               colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
               chart: {
                  height: 320,
                  width: "100%",
                  type: "donut",
               },
               stroke: {
                  colors: ["transparent"],
                  lineCap: "",
               },
               plotOptions: {
                  pie: {
                  donut: {
                     labels: {
                        show: true,
                        name: {
                        show: true,
                        fontFamily: "Inter, sans-serif",
                        offsetY: 20,
                        style: {
                           fontFamily: "Inter, sans-serif",
                           cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                        },
                        },
                        total: {
                        showAlways: true,
                        show: true,
                        label: "Total",
                        fontFamily: "Inter, sans-serif",
                        formatter: function (w:any) {
                           const sum = w.globals.seriesTotals.reduce((a:any, b:any) => {
                              return a + b
                           }, 0)
                           return `${sum}% - ${totalMonth}`
                        },
                        style: {
                           fontFamily: "Inter, sans-serif",
                           cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                        }
                        },
                        value: {
                        show: true,
                        fontFamily: "Inter, sans-serif",
                        offsetY: -20,
                        formatter: function (value:any) {
                           return value + "%"
                        },
                        },
                     },
                     size: "80%",
                  },
                  },
               },
               grid: {
                  padding: {
                  top: -2,
                  },
               },
               labels: ["Submitted", "Checked", "Qualified", "UnQualified"],
               dataLabels: {
                  enabled: false,
               },
               legend: {
                  position: "bottom",
                  fontFamily: "Inter, sans-serif",
               },
               yaxis: {
                  labels: {
                  formatter: function (value:any) {
                     return value + "%"
                  },
                  },
               },
               xaxis: {
                  labels: {
                  formatter: function (value:any) {
                     return value  + "%"
                  },
                  },
                  axisTicks: {
                  show: false,
                  },
                  axisBorder: {
                  show: false,
                  },
               },
            }
            }
            
            if(typeof window !== 'undefined'){
               if (document.getElementById("donut-chart-month") && typeof ApexCharts !== 'undefined') {
               chart = new ApexCharts(document.getElementById("donut-chart-month"), getChartOptions());
               chart.render();
            }}    
      }
      return () => {
         if (chart) {
           chart.destroy();
         }
       };
   },[data])
   
   return(
   <>
   <div className="h-full bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between mb-3">
               <div className="flex justify-center items-center">
                     <h5 className="text-xl font-bold leading-none text-gray-900 pe-1">Month</h5>
                     
                  </div>
               
            </div>

            
            <div className="py-6" id="donut-chart-month">
            </div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
               <div className="grid grid-cols-4 gap-2 items-center text-center pt-5">
                  <div className="text-color-donut-1 text-sm">
                     <h1>Submitted</h1>
                     <span>{data?.numberCVSubmittedMonth}</span>
                  </div>
                  <div className="text-color-donut-2 text-sm">
                     <h1>Checked</h1>
                     <span>{data?.numberCVCheckedMonth}</span>
                  </div>
                  <div className="text-color-donut-3 text-sm">
                     <h1>Qualified</h1>
                     <span>{data?.numberCVQualifiedMonth}</span>
                  </div>
                  <div className="text-color-donut-4 text-sm">
                     <h1>UnQualified</h1>
                     <span>{data?.numberCVUnQualifiedMonth}</span>
                  </div>
               </div>
               </div>
         </div>
   </>)
}
export default MonthCV;