import { TableRow } from "./TableRow";

function Table({ historyData, handleRowClick, activeId, details }: TableProps) {
  return (
    <table className="w-full m-auto md:w-3/4">
      <thead className="text-lg bg-cyan-950">
        <tr>
          <th className="p-5 rounded-tl-lg">ID</th>
          <th className="p-5">Datum</th>
          <th className="p-5 hidden md:table-cell">Fil</th>
          <th className="p-5">Konto</th>
          <th className="p-5">Belopp</th>
          <th className="p-5 hidden md:table-cell pr-10 rounded-tr-lg">Kommentar</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((item) => (
          <TableRow
            key={item.transaktions_id}
            item={item}
            handleRowClick={handleRowClick}
            activeId={activeId}
            details={details}
          />
        ))}
      </tbody>
    </table>
  );
}

export { Table };