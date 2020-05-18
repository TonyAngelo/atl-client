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
    //["Egyptian", "12th Dynasty", new Date(-1991, 0, 2), new Date(-1802, 0, 1)],
    //["Egyptian", "13th Dynasty", new Date(-1802, 0, 2), new Date(-1649, 0, 1)],
    ["Egyptian", "14th Dynasty", new Date(-1725, 0, 2), new Date(-1650, 0, 1)],
    ["Egyptian", "15th Dynasty", new Date(-1650, 0, 2), new Date(-1550, 0, 1)],
    ["Egyptian", "Abydos", new Date(-1650, 0, 2), new Date(-1600, 0, 1)],
    ["Egyptian", "16th Dynasty", new Date(-1649, 0, 2), new Date(-1582, 0, 1)],
    ["Egyptian", "17th Dynasty", new Date(-1580, 0, 2), new Date(-1550, 0, 1)],
    ["Egyptian", "18th Dynasty", new Date(-1550, 0, 2), new Date(-1292, 0, 1)],
    ["Egyptian", "19th Dynasty", new Date(-1292, 0, 2), new Date(-1189, 0, 1)],
    ["Egyptian", "20th Dynasty", new Date(-1189, 0, 2), new Date(-1077, 0, 1)],
    ["Egyptian Notes", 'First "Sea Peoples" invasion', new Date(-1208, 0, 2), new Date(-1208, 11, 30)],
    ["Egyptian Notes", 'Second "Sea Peoples" invasion', new Date(-1177, 0, 2), new Date(-1177, 11, 30)],
    //["Mycenaean", "Middle Helladic I", new Date(-2000, 0, 2), new Date(-1900, 0, 1)],
    //["Mycenaean", "Middle Helladic II", new Date(-1900, 0, 2), new Date(-1700, 0, 1)],
    ["Mycenaean", "MHIII", new Date(-1700, 0, 2), new Date(-1550, 0, 1)],
    ["Mycenaean", "LHIA", new Date(-1550, 0, 2), new Date(-1500, 0, 1)],
    ["Mycenaean", "LHIB", new Date(-1500, 0, 2), new Date(-1450, 0, 1)],
    ["Mycenaean", "LHII", new Date(-1450, 0, 2), new Date(-1400, 0, 1)],
    ["Mycenaean", "LHIIIA", new Date(-1400, 0, 2), new Date(-1300, 0, 1)],
    ["Mycenaean", "LHIIIB", new Date(-1300, 0, 2), new Date(-1200, 0, 1)],
    ["Mycenaean", "LHIIIC", new Date(-1200, 0, 2), new Date(-1100, 0, 1)],
    ["Mycenaean Notes", "End of Trojan War", new Date(-1208, 0, 2), new Date(-1208, 11, 30)],
    //["Minoan", "Protopalatial MMIB", new Date(-1900, 0, 1), new Date(-1800, 0, 1)],
    //["Minoan", "Protopalatial MMIIA", new Date(-1800, 0, 1), new Date(-1750, 0, 1)],
    //["Minoan", "Neopalatial MMIIB", new Date(-1750, 0, 1), new Date(-1700, 0, 1)],
    ["Minoan", "MMIIIA", new Date(-1700, 0, 1), new Date(-1650, 0, 1)],
    ["Minoan", "MMIIIB", new Date(-1650, 0, 1), new Date(-1600, 0, 1)],
    ["Minoan", "LMIA", new Date(-1600, 0, 1), new Date(-1500, 0, 1)],
    ["Minoan", "LMIB", new Date(-1500, 0, 1), new Date(-1450, 0, 1)],
    ["Minoan", "LMII", new Date(-1450, 0, 1), new Date(-1400, 0, 1)],
    ["Minoan", "LMIIIA", new Date(-1400, 0, 1), new Date(-1350, 0, 1)],
    ["Minoan", "LMIIIB", new Date(-1350, 0, 1), new Date(-1100, 0, 1)],
    ["Minoan Notes", "Palaces Destroyed", new Date(-1450, 0, 1), new Date(-1450, 11, 30)],
    ["Hittite", "Old Kingdom", new Date(-1700, 0, 1), new Date(-1400, 0, 1)],
    ["Hittite", "Middle Kingdom", new Date(-1400, 0, 1), new Date(-1200, 0, 1)],
  ];

  const options = {
    title: "Age vs. Weight comparison",
    colors: ['#DDDD00', '#DDDD00', '#DDDD00', '#DDDD00', '#DDDD00', '#DD00DD', '#DD00DD', '#00DDDD', // egypt
             '#000000', '#000000', 
             '#00DD00', '#00DD00', '#00DD00', '#00DD00', '#00DD00', '#00DD00', '#00DD00', // mycenaean
             '#000000',
             '#0000DD', '#0000DD', '#0000DD', '#0000DD', '#0000DD', '#0000DD', '#0000DD', // minoan
             '#000000',
             '#DD0000', '#DD0000',]
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
      
      <PageTitle loaded={props.isLoaded}>Late Bronze Age Timeline</PageTitle>
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