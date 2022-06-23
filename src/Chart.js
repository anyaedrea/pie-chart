import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

/** adjust the font size according to the chart's size */
const adjustFontSize = (ctx) => {
  const avgSize = Math.round((ctx.chart.height + ctx.chart.width) / 2);
  let size = Math.round(avgSize / 32);
  size = size > 12 ? 12 : size; // setting max limit to 12
  return {
    size: size,
  };
};

export default function Chart() {
  const dataArray = [10, 50, 60, 30];
  const backgroundColors = ["#01cda9", "#332d4f", "#e54461", "#b6b544"];
  const labels = ["#1", "#2", "#3", "#4"];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Pie Chart With Labels Inside",
        data: dataArray,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const legendOptions = {
    position: "right",
    align: "start",
    labels: {
      usePointStyle: true /* circles/rectangles*/,
      font: adjustFontSize,
    },
  };

  const datalabelsOptions = {
    display: true,
    color: "white",

    /* customize the labels
    default: value */
    formatter: (val, ctx) => {
      const total = dataArray.reduce((prev, curr) => prev + curr, 0);
      const valPercent = val / total;
      const label = ctx.chart.data.labels[ctx.dataIndex];
      return [
        label,
        `Data: ${val}`,
        `%: ${valPercent.toFixed(2)}%`,
      ]; /*for multiple lines*/
      //return `Data: ${val} %: ${valPercent.toFixed(2)}%`; /*one line*/
    },
    font: adjustFontSize,
  };

  const tooltipOptions = {
    callbacks: {
      label: function (ctx) {
        /** multiline label */
        // let labelArray = [];
        // let label = ctx.chart.data.labels[ctx.dataIndex];
        // labelArray.push(label);
        // const value = ctx.dataset.data[ctx.dataIndex];
        // const total = dataArray.reduce((prev, curr) => prev + curr, 0);
        // const valPercent = value / total;
        // labelArray.push(`${value}`);
        // labelArray.push(`${valPercent.toFixed(2)}`);
        // return labelArray;

        /* single line */
        let label = ctx.chart.data.labels[ctx.dataIndex];
        label += ": ";
        const value = ctx.dataset.data[ctx.dataIndex];
        const total = dataArray.reduce((prev, curr) => prev + curr, 0);
        const valPercent = value / total;
        label += `${value} (${valPercent.toFixed(2)}%)`;
        return label;
      },
    },
  };

  const options = {
    plugins: {
      legend: legendOptions, //customize legend
      datalabels: datalabelsOptions, //show labels in each wedge

      /*customize tooltip.
      default: label: value (e.g #1: 10)*/
      tooltip: tooltipOptions,
    },
  };

  return (
    <Pie
      data={chartData}
      options={options}
      plugins={[ChartDataLabels]} /** !!!! important !!!!! */
      className="chart-canvas"
    />
  );
}
