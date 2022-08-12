/* ADAPTED FROM https://github.com/trananhtuat/react-drop-file-input */
import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DocumentUpload.css';
import FormData from 'form-data';
import { useState, useEffect } from 'react';
import ImageConfig from '../../../../utils/fileIcons';
import uploadImg from '../../../../data/images/cloud-upload-regular-240.png';
import Loader from '../../../Loader/Loader';

export default function DocumentUpload({ userInfo, loading, setLoading }) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const originalFileName = (fileName) => fileName.substring(fileName.indexOf('_') + 1);

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [fileList, setFileList] = useState([]);
  const [prevFiles, setPrevFiles] = useState([]);
  const [pending, setPending] = useState(false);

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
  // AXIOS FUNCTIONS (GET & POST)
  // **********************************************************************

  /* Saves a file to database */
  async function uploadFile(file, username) {
    setLoading(true);
    try {
      // axios parameters
      const form = new FormData();
      form.append('file', file);
      form.append('unixname', username);
      // call axios with specifications for file upload
      const { data } = await axios.post('api/file/', form, {
        headers: form.getHeaders ? form.getHeaders() : { 'Content-Type': 'multipart/form-data' },
      });
      fileRemove(file);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function fetchFiles(username) {
    setPending(true);
    try {
      const { data } = await axios.get('api/file', { params: { unixname: username } });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  function handleFileUpload() {
    fileList.forEach((file) => uploadFile(file, userInfo.unixname));
  }

  // **********************************************************************
  // USE EFFECT
  // **********************************************************************

  useEffect(() => {
    async function effect() {
      if (userInfo.user.role !== 'admin') {
        try {
          const data = await fetchFiles(userInfo.unixname);
          setPrevFiles(data);
          setPending(false);
        } catch (err) {
          console.error(err);
        }
      }
    }
    // call defined function
    effect();
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading || pending) {
    return <Loader />;
  }

  // admins can not access this page
  if (userInfo.user.role === 'admin') {
    return (
      <div className="DocumentUpload blocked">
        <h1>No admin access.</h1>
        <h2 className="home-link">
          <Link to="/">
            Return home?
          </Link>
        </h2>
      </div>
    );
  }

  // ADAPTED FROM https://github.com/trananhtuat/react-drop-file-input
  return (
    <div className="DocumentUpload">
      <h2 className="header">
        Upload your documents here:
      </h2>
      <div className="drop-file-input">
        <div className="drop-file-input-label">
          <img src={uploadImg} alt="" />
          <p>Click / Drag & Drop</p>
          <p><i>Accepted: DOCX, PDF, JPEG, PNG </i></p>
          <p><i>File naming: Letters and numbers ONLY - no special chars</i></p>
        </div>
        <input type="file" name="file" value="" onChange={onFileDrop} encType="multipart/form-data" />
      </div>
      {
        fileList.length > 0 ? (
          <div className="drop-file-preview">
            <h4 className="drop-file-preview-title">
              Files to upload:
            </h4>
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
        ) : null
      }
      {
        prevFiles.length > 0 ? (
          <div className="previous-files">
            <h4>Previously uploaded files:</h4>
            {prevFiles.map((file) => (
              <div key={file.file.name}>
                <a
                  href={file.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {originalFileName(file.file.name)}
                </a>
                <br />
              </div>
            ))}
          </div>
        ) : null
      }
    </div>
  );
}
