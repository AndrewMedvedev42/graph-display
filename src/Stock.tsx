import { useEffect, useState } from "react"
import axios from "axios"
import Plot from 'react-plotly.js';
import {StatsBox} from "./StatsBox"

export const Stock = () => {
    const [stockData, setStockData] = useState<any>([])
    const [stockDataTwo, setStockDataTwo] = useState<any>([])

    useEffect(()=>{
        fetchStck()
    },[])
    
    const fetchStck = () => {
        Promise.all([
                axios.get(`https://api.iex.cloud/v1/data/core/energy/DHHNGSP?limit=30&token=${process.env.REACT_APP_GRAPH_KEY}`),
                axios.get(`https://api.iex.cloud/v1/data/core/energy/GASREGCOVW?limit=30&token=${process.env.REACT_APP_GRAPH_KEY}`)
            ])
            .then((data:any)=>{
                setStockData(data[0].data)
                setStockDataTwo(data[1].data)
            })
            .catch((err)=>{
                console.log(err);           
            })
    }

    return (
        <div className="container">
            <h1>Commodities</h1>
            <div className="content">
                <Plot
                    data={
                        [
                            {
                                name:"DHHNGSP",
                                x: stockData.map((item:any)=>item.date),
                                y: stockData.map((item:any)=>item.value),
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'blue'},
                            },
                            {
                                name:"GASREGCOVW",
                                x: stockDataTwo.map((item:any)=>item.date),
                                y: stockDataTwo.map((item:any)=>item.value),
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                        ]
                    }
                    layout={{width: 700, height: 500, title: 'Value(Y), Date(X)'}}
                />
                <div className="stats">
                    <StatsBox title="DHHNGSP" list={stockData}/>
                    <StatsBox title="GASREGCOVW" list={stockDataTwo} />
                </div>
            </div>
        </div>
    )
}

