import React, { useRef, useEffect, useState, useContext, Component } from 'react';
import Chart, { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import lineheightAnnotation from "chartjs-plugin-lineheight-annotation";
import { RouteContext } from '../config/RouteContext'
Chart.register(annotationPlugin);
Chart.register(lineheightAnnotation);







const Elevation = () => {


    const { routes } = useContext(RouteContext)

    const routesData = []
    const routeLabel = []
    for (const route of routes.geoJson.coordinates) {
        routesData.push(route[2])
        routeLabel.push(`${route[1]}`)
    }

    const data = {
        labels: routeLabel,
        datasets: [
            {
                label: "Total",
                fill: true,
                backgroundColor: "transparent",
                borderColor: "#00AB84",
                borderWidth: 1,
                pointRadius: 1,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
                pointHoverBorderWidth: 5,
                pointHoverRadius: 10,
                data: routesData,
                tension: 0.3,

            }
        ]
    };

    const tooltipLine = {
        id: "tooltipLine",
        beforeDraw: chart => {
            // console.log(chart)
        }
    }


    const options = {
        interaction: {
            mode: 'point'
        },
        // onClick: (e, element) => {
        //     if (element.length > 0) {
        //         var ind = element[0]._index;
        //         alert(ind);
        //     }
        // },
        // onClick: (e) => {
        //     console.log(routesData[e.chart.tooltip.dataPoints[0].element.$context.dataIndex], routeLabel[e.chart.tooltip.dataPoints[0].element.$context.dataIndex]);
        // },

        lineHeightAnnotation: {
            color: "red",
            shadow: false,
            borderDash: "5 5"
        },
        // onHover: (e) => { console.log(e) },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    beginAtZero: true,
                    color: "black",
                    font: {
                        size: 18
                    }
                },
                grid: {
                    color: "black"
                }
            },
            x: {
                ticks: {
                    beginAtZero: true,
                    color: "black",
                    font: {
                        size: 18
                    }
                },
                grid: {
                    color: "transparent"
                }
            },

        },
        legend: {
            display: false
        },
        hover: {
            intersect: false
        },
        tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
            displayColors: false,
            yAlign: "bottom",
            backgroundColor: "#ffffff",
            titleFontColor: "black",
            bodyFontColor: "orange",
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)"
        },
        plugins: {

            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
            autocolors: false,
            annotation: {
                annotations: [
                    {
                        adjustScaleRange: true,
                        type: 'line',
                        // mode: 'vertical',
                        scaleID: 'x',
                        value: routes.pointsOfInterest[6].latitude,
                        borderColor: 'blue',
                        borderWidth: 5,
                        onClick: (e) => { console.log(e) },
                        label: {
                            enabled: true,
                            content: `Point of interest ${routes.pointsOfInterest[5].latitude}`,
                            backgroundColor: "rgba(0,255, 0, 1)",
                            color: "black",
                            rotation: -5
                        },

                    }],
                drawTime: 'afterDraw', // (default)
                events: ['click'],

            }
        }
    }
    const onElementsClick = (data) => console.log(data);
    return (
        <div className="App">
            <Line onElementsClick={onElementsClick} data={data} options={options} />
        </div>
    );
}
export default Elevation