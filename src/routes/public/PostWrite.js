import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Progress,
} from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { editorConfiguration } from '../../components/editor/EditorConfig';
import Init from '../../components/editor/UploadAdapter';

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({ title: '', contents: '', fileUrl: '' });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    if (data && data.match('<img src=')) {
      const imgStart = data.indexOf('<img src=');
      let imgEnd = '';
      let extension = '';
      let imgUrl = '';
      const ext_list = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

      for (let i = 0; i < ext_list.length; i++) {
        if (data.match(ext_list[i])) {
          extension = ext_list[i];
          imgEnd = data.indexOf(`${ext_list[i]}`);
        }
      }

      if (extension === 'jpeg') {
        imgUrl = data.substring(imgStart + 10, imgEnd + 4);
      } else {
        imgUrl = data.substring(imgStart + 10, imgEnd + 3);
      }

      setValues({
        ...form,
        fileUrl: imgUrl,
        content: data,
      });
    } else {
      setValues({
        ...form,
        fileUrl: 'https://source.unsplash.com/random/301x201',
        content: data,
      });
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Form>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onInit={Init}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              제출
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
};

export default PostWrite;
