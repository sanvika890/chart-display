import data from "../../store/Wine-Data.json";
import ReactEcharts from "echarts-for-react-typescript";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as echarts from "echarts-for-react";

const ChartsDisplay = () => {
	//set the options for the scatter graph
	let optionScatter = {
		backgroundColor: {
			type: "radial",
			x: 0.3,
			y: 0.3,
			r: 0.8,
			colorStops: [
				{
					offset: 0,
					color: "#f7f8fa",
				},
				{
					offset: 1,
					color: "#cdd0d5",
				},
			],
		},
		tooltip: {
			trigger: "axis",
			axisPointer: { type: "cross" },
		},
		title: {
			text: "Scatter Plot for Color Intensity vs Hue",
			textAlign: "auto",
			left: 150,
			textStyle: {
				fontSize: 24,
			},
		},
		xAxis: {
			data: scatterPlotXaxis,
			type: "category",
			name: "Color Intensity",
			nameLocation: "middle",
			nameGap: 30,
			nameTextStyle: {
				fontWeight: "bolder",
				fontSize: 16,
			},
		},
		yAxis: {
			type: "value",
			name: "Hue",
			nameRotate: 90,
			nameLocation: "middle",
			nameGap: 30,
			nameTextStyle: {
				fontWeight: "bolder",
				fontSize: 16,
			},
		},
		series: [
			{
				data: scatterPlotYaxis,
				type: "scatter",

				symbol: "diamond",
				color: ["red"],
			},
		],
		responsive: true,
		maintainAspectRatio: false,
	};

	//set the options for the bar graph

	const optionBar = {
		backgroundColor: {
			type: "radial",
			x: 0.3,
			y: 0.3,
			r: 0.8,
			colorStops: [
				{
					offset: 0,
					color: "#f7f8fa",
				},
				{
					offset: 1,
					color: "#cdd0d5",
				},
			],
		},
		tooltip: { show: true, trigger: "axis", axisPointer: { type: "cross" } },
		title: {
			text: "Average Malic Acid for Alcohol Classes",
			left: 150,
			textStyle: {
				fontSize: 24,
			},
		},
		xAxis: {
			data: barPlotXaxis,
			type: "category",
			name: "Alcohol",
			nameLocation: "middle",
			nameGap: 30,
			nameTextStyle: {
				fontWeight: "bolder",
				fontSize: 16,
			},
		},
		yAxis: {
			type: "value",
			name: "Malic Acid",
			nameRotate: 90,
			nameLocation: "middle",
			nameGap: 30,
			nameTextStyle: {
				fontWeight: "bolder",
				fontSize: 16,
			},
		},
		series: [
			{
				data: barPlotYaxis,
				type: "bar",
				colorBy: "data",
				color: ["green"],
			},
		],
	};

	return (
		<div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", height: "100vh", width: "100%" }}>
			<div style={{ width: "50vw", height: "100vh", display: "flex", alignItems: "center" }}>
				<ReactEcharts option={optionScatter} style={{ width: "80%", height: "500px", marginLeft: "10%" }} />
			</div>

			<div style={{ width: "50vw", height: "100vh", display: "flex", alignItems: "center" }}>
				<ReactEcharts option={optionBar} style={{ width: "80%", height: "500px", marginLeft: "10%" }} />
			</div>
		</div>
	);
};

export default ChartsDisplay;

//get the data points for scatter chart's x axis
const scatterPlotXaxis = data.map((item) => item["Color intensity"]).sort();

//get the data points for scatter chart's y axis

const scatterPlotYaxis = data.map((item) => item.Hue);

//for bar graph, get all the classes of alcohol
function removeDuplicates() {
	const newArr = data.map((item) => item.Alcohol);
	return newArr.filter((item, index) => newArr.indexOf(item) === index);
}

//assign classes for x axis
const barPlotXaxis = removeDuplicates();

//get the average of malic acid of an alcohol's class
function getAverage(value: number) {
	if (data) {
		let avgOne = data.filter((item) => item.Alcohol === value).map((item) => item["Malic Acid"]);

		return avgOne.reduce((a, b) => a + b, 0) / avgOne.length;
	}
}

//assign each alcohol's average to it
const assignAverage = () => {
	const newArr = [];
	if (data) {
		for (let i = 1; i <= barPlotXaxis.length; i++) {
			newArr.push(getAverage(i));
		}
	}
	return newArr;
};

//assign the average for y axis
const barPlotYaxis = assignAverage();
