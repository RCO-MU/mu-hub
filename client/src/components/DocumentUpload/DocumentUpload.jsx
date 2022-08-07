/* ADAPTED FROM https://github.com/trananhtuat/react-drop-file-input */
import * as React from 'react';
import axios from 'axios';
import './DocumentUpload.css';
import FormData from 'form-data';
import { useState } from 'react';
import ImageConfig from '../../utils/images';
import uploadImg from '../../data/images/cloud-upload-regular-240.png';
import Loader from '../Loader/Loader';

export default function DocumentUpload({ userInfo, loading, setLoading }) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [fileList, setFileList] = useState([]);

  // **********************************************************************
  // HELPER FUNCTIONS (file list manipulation)
  // **********************************************************************

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
  };

  function fileRemove(file) {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  }

  // **********************************************************************
  // AXIOS FUNCTIONS (POST)
  // **********************************************************************

  /* Saves a file to database */
  async function uploadFile(file) {
    setLoading(true);
    try {
      // axios parameters
      const form = new FormData();
      form.append('file', file);
      form.append('unixname', userInfo.unixname);

      // call axios with specifications for file upload
      const url = 'api/upload/';
      const { data } = await axios.post(url, form, {
        headers: form.getHeaders ? form.getHeaders() : { 'Content-Type': 'multipart/form-data' },
      });

      // print server resposnse
      console.log('response from server: ', data);

      fileRemove(file);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  function handleFileUpload() {
    fileList.forEach((file) => uploadFile(file));
  }

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="DocumentUpload">
      <h2 className="header">
        Upload your documents here:
      </h2>
      <div
        className="drop-file-input"
      >
        <div className="drop-file-input-label">
          <img src={uploadImg} alt="" />
          <p>Click OR Drag and Drop</p>
        </div>
        <input type="file" name="file" value="" onChange={onFileDrop} encType="multipart/form-data" />
      </div>
      {
        fileList.length > 0 ? (
          <div className="drop-file-preview">
            <p className="drop-file-preview-title">
              Files to upload
            </p>
            {
              fileList.map((item, index) => (
                <div key={`file${index + 1}`} className="drop-file-preview-item">
                  <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig.default} alt="" />
                  <div className="drop-file-preview-item-info">
                    <p>{item.name}</p>
                  </div>
                  <span
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                    className="drop-file-preview-item-del"
                    onClick={() => fileRemove(item)}
                    style={{ color: 'red', fontSize: 'x-large' }}
                  >
                    <b>x</b>
                  </span>
                </div>
              ))
            }
            <input
              className="action-button"
              type="submit"
              value="Upload"
              onClick={handleFileUpload}
            />
          </div>
        ) : <h2>Todo: Display previously uploaded files or file upload error.</h2>
      }
    </div>
  );
}
