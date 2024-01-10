import { useEffect, useState } from "react"
import axios from "axios"
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Label,
    Tooltip,
    Legend,
    LineChart,
    ResponsiveContainer
} from "recharts"
import {StatsBox} from "./StatsBox"

export const Stock = () => {
    const [stockData, setStockData] = useState<any>([])

    useEffect(()=>{
        fetchStck()
    },[])
    
    const fetchStck = () => {
        Promise.all([
                axios.get(`https://api.iex.cloud/v1/data/core/energy/DHHNGSP?limit=30&token=${process.env.REACT_APP_GRAPH_KEY}`),
                axios.get(`https://api.iex.cloud/v1/data/core/energy/GASREGCOVW?limit=30&token=${process.env.REACT_APP_GRAPH_KEY}`)
            ])
            .then((data:any)=>{
                let dataAll = data[0].data.map((item:any, index:number)=>({
                    DHHNGSP:item.value,
                    date:item.date,
                    GASREGCOVW:data[1].data[index].value,
                })).reverse()
                setStockData(dataAll)
            })
            .catch((err)=>{
                console.log(err);           
            })
    }

    return (
        <div className="container">
            <h1>Commodities</h1>
            <div className="content">
                <ResponsiveContainer width="100%" height={500}>
                <LineChart margin={{top:20, right:30, bottom:30, left:30}} width={500} height={350} data={stockData}>
                    <XAxis dataKey="date">
                        <Label value="Date" position="bottom" />
                    </XAxis>
                    <YAxis>
                        <Label
                            value="Value"
                            angle={90}
                            position="left"
                            dy="-10"
                        />
                    </YAxis>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Tooltip/>
                    <Legend verticalAlign="top"/>
                    <Line type="monotone" dataKey="DHHNGSP" stroke="#8884d8" />
                    <Line type="monotone" dataKey="GASREGCOVW" stroke="#82ca9d" />
                </LineChart>
                </ResponsiveContainer>
                <div className="stats">
                    <StatsBox title="DHHNGSP" list={stockData}/>
                    <StatsBox title="GASREGCOVW" list={stockData}/>
                </div>
            </div>
        </div>
    )
}

