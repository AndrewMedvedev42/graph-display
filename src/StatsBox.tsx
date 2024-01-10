export const StatsBox = ({title, list, date}:any) => {
    return (
        <div className="statsBox">
            <span className="columnTitle">{title}</span>
            <table>
                <tr>
                    <th>Value</th>
                    <th>Date</th>
                </tr>
                {
                    list?.map((item:any)=>(
                        <tr key={item[title]}>
                            <td>{item[title]}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}