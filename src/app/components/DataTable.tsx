export default function DataTable() {
    return (
        <div className="right-column">
        <div className="content-title">Archived Tickets</div>
        <div className="data-column">
            <table className="rounded-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody id="data-table-body">
                </tbody>
            </table>
        </div>
    </div>
    )
}