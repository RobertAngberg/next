export default function TableRow({ item, handleRowClick, activeId, details }: TableRowProps) {
  return (
    <>
      {/* Detta är foldat / minimerat */}
      <tr
        key={item.transaktions_id}
        onClick={() => handleRowClick(item.transaktions_id)}
        className="even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-700 cursor-pointer"
      >
        <td className="p-5">{item.transaktions_id}</td>
        <td className="p-5">{item.transaktionsdatum}</td>
        <td className="p-5 hidden md:table-cell">{item.fil}</td>
        <td className="p-5">{item.kontobeskrivning}</td>
        <td className="p-5">{item.belopp}</td>
        <td className="p-5 hidden md:table-cell">{item.kommentar}</td>
      </tr>

      {/* Detta är klickat / unfoldat */}
      {activeId === item.transaktions_id && (
        <tr className="bg-gray-800 text-left">
          <td colSpan={6}>
            <div className="flex justify-center items-center p-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-1/3">Konto</th>
                    <th className="w-1/3">Debet</th>
                    <th className="w-1/3">Kredit</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail) => (
                    <tr key={detail.transaktionspost_id}>
                      <td>{detail.kontobeskrivning}</td>
                      <td>{detail.debet}</td>
                      <td>{detail.kredit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
