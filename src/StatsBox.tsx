export const StatsBox = ({title, list}:any) => {
    return (
        <div className="statsBox">
            <span className="columnTitle">{title}</span>
            <table>
                <tr>
                    <th>Value</th>
                    <th>Date</th>
                </tr>
                {
                    list.map(({value, date}:any)=>(
                        <tr key={value}>
                            <td>{value}</td>
                            <td>{date}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}