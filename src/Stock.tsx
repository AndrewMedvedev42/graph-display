import { useEffect, useState } from "react"
import axios from "axios"
import Plot from 'react-plotly.js';

export const Stock = () => {
    const [stockChartXValue, setStockChartXValue] = useState<any>([])
    const [stockChartYValue, setStockChartYValue] = useState<any>([])

    useEffect(()=>{
        fetchStck()
    },[])
    
    const fetchStck = () => {
        axios
            .get(`https://api.iex.cloud/v1/data/core/largest_trades/spy?token=${process.env.REACT_APP_GRAPH_KEY}`)
            .then(({data}:any)=>{
                data.forEach((item:any)=>{
                    setStockChartXValue((oldArray:any) => [...oldArray, item.timeLabel])
                    setStockChartYValue((oldArray:any) => [...oldArray, item.price])
                })
            })
            .catch((err)=>{
                console.log(err);           
            })
    }
    return (
        <div>
            <h1>Stock Market</h1>
            <Plot
                data={[
                    {
                    x: stockChartXValue,
                    y: stockChartYValue,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                    }
                ]}
                layout={{width: 1220, height: 640, title: 'A Fancy Plot'}}
            />
        </div>
    )
}

