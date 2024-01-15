import React, {useEffect, useState} from "react"
import ApexCharts from "apexcharts"
const ProductStatistic = (props: any) => {
   const data = props.data?.numberProduct;
   const cateName = props.cateName;
   let chart:any;
   let totalProduct = data?.totalProduct;
   let category1 = Number(totalProduct ? ((data.totalProductCategory1 / totalProduct) * 100).toFixed(2) : 0);
   let category2 = Number(totalProduct ? ((data.totalProductCategory2 / totalProduct) * 100).toFixed(2) : 0);
   let category3 = Number(totalProduct ? ((data.totalProductCategory3 / totalProduct) * 100).toFixed(2) : 0);

   useEffect(()=>{
      if(data !== undefined && Object.keys(cateName).length !== 0 ){
         const getChartOptions = () => {
            return {
               series: [category1, category2, category3],
               colors: ["#1C64F2", "#16BDCA", "#9061F9"],
               chart: {
               height: 320,
               width: 460,
               type: "pie",
               },
               stroke: {
               colors: ["white"],
               lineCap: "",
               },
               plotOptions: {
               pie: {
                  labels: {
                     show: true,
                  },
                  size: "100%",
                  dataLabels: {
                     offset: -25
                  }
               },
               },
               labels: [`${cateName?.cateName1}`, `${cateName?.cateName2}`, `${cateName?.cateName3}`],
               dataLabels: {
               enabled: true,
               style: {
                  fontFamily: "Inter, sans-serif",
               },
               },
               legend: {
               position: "right",
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
   
         if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
            chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
            chart.render();
         }
      }
      return () => {
         if (chart) {
         chart.destroy();
         }
      };
    },[data,cateName])
    
   return(
      <>
         <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
                    <div className="flex justify-around w-full">                      
                          <div>
                            <h5 className="text-xl font-bold leading-none text-gray-900 me-1">Product Charts</h5>
                          </div>
                          <div>
                            <h5 className="text-xl font-bold leading-none text-gray-900 me-1">Quantity</h5>                              
                          </div>             
                    </div>
                    <div className="flex justify-around pt-8">
                      <div className="py-6" id="pie-chart"></div>
                      
                      <div className="mr-28 grid">
                        <div className="text-color-pie-1 font-semibold text-sm">
                          <h1>{cateName?.cateName1}: <span>{data?.totalProductCategory1}</span></h1>
                          
                        </div>
                        <div className="text-color-pie-2 font-semibold text-sm">
                          <h1>{cateName?.cateName2}: <span>{data?.totalProductCategory2}</span></h1>
                          
                        </div>
                        <div className="text-color-pie-3 font-semibold text-sm">
                          <h1>{cateName?.cateName3}: <span>{data?.totalProductCategory3}</span></h1>                        
                        </div>
                        <div className="text-orange-500 font-semibold text-sm">
                          <h1>Total: <span>{totalProduct}</span></h1>
                        </div>
                      </div>
                    </div>
                  </div>
      </>
   )
}
export default ProductStatistic;