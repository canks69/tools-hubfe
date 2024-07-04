import {DownloadIcon} from "../icons/icons.tsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

interface ActionDropdownProps {
  data?: RowData;
}

interface RowData {
  [key: string]: string;
}

export const ActionDropdown = (props: ActionDropdownProps) => {
  const [display, setDisplay] = useState(false)
  const [tempData, setTempData] = useState<[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAction = () => {
    setDisplay(!display)
  }

  const hadleDownload = async (template: string, invoiceId: string) => {
    setDisplay(false)
    const data = {
      Template: template,
      Reff_Id: invoiceId,
      uuid: localStorage.getItem('userId')
    }
    try {
      const response = await axios.get('/api/invoice/download/' + data.uuid + '/' + data.Reff_Id + '/' + data.Template, {
        responseType: 'blob',
        headers: {
          'accept': 'application/json',
        }
      })
      const blob = new Blob([response.data], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.Reff_Id}.pdf`;
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    localStorage.getItem('template') && setTempData(JSON.parse(localStorage.getItem('template') as string))
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDisplay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleAction}
        className={`text-white px-4 py-2 rounded-md`}>
        <DownloadIcon size={20} color={'#f97316'}/>
      </button>
      {display && (
        <div className="absolute min-w-20 z-10 top-0 right-0 bg-white shadow-md rounded-md p-2">
          <ul className={"text-left"}>
            {tempData?.map((action, index) => (
              <li
                onClick={() => hadleDownload(action, props.data?.Reff_Id as string)}
                key={index} className="hover:bg-gray-300 px-2 py-1 rounded-lg cursor-pointer">{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}