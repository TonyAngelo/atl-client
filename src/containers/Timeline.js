import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import Chart from "react-google-charts";


export default function Timeline(props) {
  // const [data, setData] = useState({});
  // const queryStr = "pages?slug=about&_embed";
  const columns = [
    { type: "string", id: "Empire" },
    { type: "string", id: "President" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" }
  ];

  const rows = [
    ["Egyptian", "12th Dynasty", new Date(-1991, 0, 2), new Date(-1802, 0, 1)],
    ["Egyptian", "13th Dynasty", new Date(-1802, 0, 2), new Date(-1649, 0, 1)],
    ["Egyptian", "14th Dynasty", new Date(-1725, 0, 2), new Date(-1650, 0, 1)],
    ["Egyptian", "15th Dynasty", new Date(-1650, 0, 2), new Date(-1550, 0, 1)],
    ["Egyptian", "Abydos", new Date(-1650, 0, 2), new Date(-1600, 0, 1)],
    ["Egyptian", "16th Dynasty", new Date(-1649, 0, 2), new Date(-1582, 0, 1)],
    ["Egyptian", "17th Dynasty", new Date(-1580, 0, 2), new Date(-1550, 0, 1)],
    ["Egyptian", "18th Dynasty", new Date(-1550, 0, 2), new Date(-1292, 0, 1)],
    ["Egyptian", "19th Dynasty", new Date(-1292, 0, 2), new Date(-1189, 0, 1)],
    ["Egyptian", "20th Dynasty", new Date(-1189, 0, 2), new Date(-1077, 0, 1)],
    ["Hittite", "1st Dynasty", new Date(-2000, 0, 1), new Date(-1200, 0, 1)],
    ["Minoan", "2nd Dynasty", new Date(-2000, 0, 1), new Date(-1700, 0, 1)]
  ];

  const options = {
    title: "Age vs. Weight comparison",
    colors: ['#DDDD00', '#DDDD00', '#DD0000', '#DD0000', '#DD0000', '#DD00DD', '#DD00DD', '#DD0000', '#DD0000', 
             '#DD0000', '#000000', '#000000']
  };

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      //props.setNavKey(headerValues["About"]);

      // try {
      //   const response = await fetch(apiHeader + queryStr);
      //   if (response.ok) { 
      //     const payload = await response.json();
      //     //console.log(payload)
      //     setData(payload[0]);
      //   } 
      // } catch (e) {
      //   alert(e);
      // }

      props.setIsLoaded(true);
    }

    onLoad();
  }, []);

  return (
    <main>
      
      <PageTitle loaded={props.isLoaded}>Timeline</PageTitle>
      <Chart
        chartType="Timeline"
        data={[columns, ...rows]}
        options={options}
        width="100%"
        height="400px"
      />
    </main>
  );
}