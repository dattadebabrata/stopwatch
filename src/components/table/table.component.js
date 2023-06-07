import "./table.styles.css"
const Table = ({lapsList}) => {
    return (
        <table className={"lap-table"}>
            <thead>
            <tr>
                <th>#</th>
                <th>Lap Time</th>
                <th>Elapsed Time</th>
                <th>Current Time</th>
            </tr>
            </thead>
            <tbody>
            {lapsList.map((lap, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{lap.lapTime}</td>
                    <td>{lap.elapsedTime}</td>
                    <td>{`${lap.date} - ${lap.time}`}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;