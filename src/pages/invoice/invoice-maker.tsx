import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {TableInvoice} from "../../component/table/table-invoice";


export const InvoiceMaker = () => {
  const headers = ['Reff Id', 'Date', 'Name User', 'Total'];
  const [userId, setUserId] = useState<string>('');
  const [data, setData] = useState<[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInvoice = async () => {
    if (!userId) return;
    getTemplate();
    await axios.get('/api/invoice/' + userId)
      .then(res => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getTemplate = async () => {
    await axios.get('/api/template/')
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('template', JSON.stringify(res.data.data));
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  const downloadTemplate = async () => {
    axios.get('/api/template/download', {
      responseType: 'blob',
      headers: {
        'accept': 'application/json',
      }
    })
      .then(res => {
        const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `template.xlsx`;
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.detail,
        })
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
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.data.message,
            timer: 1200,
            showConfirmButton: false
          })
          getInvoice();
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.detail,
        })
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
            <div className="flex flex-col mt-5">
              <input
                name={"file"}
                accept={".xlsx"} type="file" className="mt-5"/>
              <label className="text-gray-300 mt-2 text-sm">
                Upload file .xlsx to generate invoice
              </label>
            </div>
            <div className="flex justify-center mt-10">
              <button
                type={"button"}
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 w-1/2 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Close
              </button>
              <button
                type={"submit"}
                className="bg-blue-500 w-1/2 text-white px-4 py-2 rounded-md ml-3 hover:bg-blue-600">
                Upload
              </button>
            </div>
            <div className="w-full mt-5 text-center">
              <label className="mt-5">
                Klik <label onClick={downloadTemplate}
                            className="cursor-pointer text-blue-500 hover:text-blue-300">Disini</label> untuk
                mendownload template excel
              </label>
            </div>
          </form>
        </div>
      )}

      <div className="mt-10">
        <div className='p-6 px-0 pt-0 pb-2 -mx-2 sm:-mx-4 min-h-[calc(60vh)]'>
          <TableInvoice headers={headers} data={data} action={"Action"}/>
        </div>
      </div>
    </div>
  )
}