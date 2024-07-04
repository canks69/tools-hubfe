import React, {useEffect, useState} from "react";
import axios from "axios";
import {TableInvoice} from "../../component/table/table-invoice";


export const InvoiceMaker = () => {
  const headers = ['Reff Id', 'Date', 'Name User', 'Total'];
  const [userId, setUserId] = useState<string>('');
  const [data, setData] = useState<[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInvoice = async () => {
    if (!userId) return;
    getTemplate();
    axios.get('/api/invoice/' + userId)
      .then(res => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getTemplate = async () => {
    axios.get('/api/template')
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('template', JSON.stringify(res.data.data));
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    axios.post('/api/invoice/upload', formData, {
      params: {
        uuid: userId as string
      }
    })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('userId', res.data.uuid);
          setUserId(res.data.uuid);
          setIsModalOpen(false);
          getInvoice();
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    isModalOpen && document.body.classList.add('overflow-hidden');
    !isModalOpen && document.body.classList.remove('overflow-hidden');
    if (!userId) {
      localStorage.getItem('userId') && setUserId(localStorage.getItem('userId') as string);
      return;
    }
    getInvoice();
  }, [isModalOpen, userId])


  return (
    <div className="px-20 my-10 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoice Maker</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f97316] text-white px-4 py-2 rounded-md">
          Upload Excel
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0  z-40 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            encType={"multipart/form-data"}
            className="bg-white p-10 rounded-lg">
            <h1 className="text-2xl font-bold">Upload Excel</h1>
            <input
              name={"file"}
              accept={".xlsx"} type="file" className="mt-5"/>
            <div className="flex justify-center mt-10">
              <button
                type={"button"}
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Close
              </button>
              <button
                type={"submit"}
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-3 hover:bg-blue-600">
                Upload
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-10">
        <div className='p-6 overflow-x-scroll px-0 pt-0 pb-2 -mx-2 sm:-mx-4 min-h-[calc(60vh)]'>
          <TableInvoice headers={headers} data={data} action={"Action"}/>
        </div>
      </div>
    </div>
  )
}