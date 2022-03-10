import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const Quill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: 1 }, { header: 2 }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: [] },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
  clipboard: { matchVisual: false },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'size',
  'color',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'align',
];

const quillStyle = {
  height: '300px',
  marginBottom: '20px',
};

const QuillEditor = ({ onChange, placeholder, value, ...other }) => {
  const ref = useRef(null);

  return (
    <Quill
      ref={ref}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      value={value}
      style={quillStyle}
      {...other}
    />
  );
};

export default QuillEditor;
