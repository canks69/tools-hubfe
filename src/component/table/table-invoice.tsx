import {CloseIcon, SearchIcon} from "../icons/icons";
import {useEffect, useState} from "react";
import {ActionDropdown} from "../button/action-dropdown.tsx";

interface TableInvoiceProps {
  headers: string[];
  data: RowData[]
  action?: string;
}

interface RowData {
  [key: string]: string;
}

``

export const TableInvoice = (props: TableInvoiceProps) => {
  const [displayData, setDisplayData] = useState<RowData[]>(props.data)
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    if (!search) {
      setDisplayData(props.data)
      return;
    }
    const filter = search.toLowerCase();
    const filteredData = props.data.filter(row =>
      Object.values(row).some(
        value => value.toString().toLowerCase().includes(filter)
      )
    );
    setDisplayData(filteredData)
  }

  const handleClearSearch = () => {
    setSearch('')
    setDisplayData(props.data)
  }


  useEffect(() => {
    displayData.length === 0 && setDisplayData(props.data)
    if (!search) return;
    handleSearch()
  }, [search])

  useEffect(() => {
    displayData.length === 0 && setDisplayData(props.data)
  }, [props.data])

  return (
    <>
      <div className="flex justify-end items-center mx-1 my-2">
        <div className="w-1/3 relative z-0">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border"
          />
          {search ? (
            <button
              onClick={handleClearSearch}
              className="absolute top-0 right-0 pt-2 pr-3">
              <CloseIcon size={24} color={'#f91640'}/>
            </button>
          ) : (
            <div className="absolute top-0 right-0 pt-2 pr-3">
              <SearchIcon size={24} color={'#f97316'}/>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-lg border bg-white">
        <div className="flex flex-col">
          {/*<div className="overflow-y-auto">*/}
            <div className="w-full py-2 px-2">
              {/*<div className="overflow-hidden">*/}
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    {props.headers.map((header, index) => (
                      <th key={index} className="px-6 py-4">{header}</th>
                    ))}
                    {props.action && (
                      <th colSpan={props.headers.length} className="px-6 py-4 text-right">
                        {props.action}
                      </th>
                    )}
                  </tr>
                  </thead>
                  <tbody>
                  {displayData.length === 0 && (
                    <tr className="border-b dark:border-neutral-500">
                      <td colSpan={props.headers.length} className="text-center">No data available</td>
                    </tr>
                  )}
                  {displayData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-300">
                      {Object.keys(row).map((key, index) => (
                        <td key={index} className="whitespace-nowrap px-6 py-4 font-medium">
                          {row[key]}
                        </td>
                      ))}
                      {props.action && (
                        <td className="text-right px-4 py-2">
                          <ActionDropdown data={row}/>
                        </td>
                      )}
                    </tr>
                  ))}
                  </tbody>
                </table>
              {/*</div>*/}
            </div>
          {/*</div>*/}
        </div>
      </div>
    </>
  )
}