import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

import ProForm, {
  ProFormUploadButton
} from '@ant-design/pro-form';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const PicturesWall = ({ images, handleChange, ...rest }: any) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',

  });

  const handleCancel = () => setState(prev => ({ ...prev, previewVisible: false }));

  const handlePreview = async (file: any) => {
    console.log("preview run");
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState(prev => ({
      ...prev,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    }));
  };


  const { previewVisible, previewImage, previewTitle } = state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <ProForm.Item name="images">
        <Upload
          name="images"
          accept="image/*"
          listType="picture-card"

          fileList={images.fileList}
          onPreview={handlePreview}
          beforeUpload={() => false}
          onChange={handleChange}
        >
          {images.length >= 8 ? null : uploadButton}
        </Upload>
      </ProForm.Item>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};


export default PicturesWall;
