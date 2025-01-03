import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import * as React from 'react'
import CreateOrEditNew from './common/CreateOrEditNew';
import GeneralLoading from '../../../../components/base/GeneralLoading';
import newService from '../../../../services/newService';
import { useNavigate } from 'react-router-dom';

export default function CreateNew() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const rs = await newService.createNew(data);
      message.success(rs.message);
      navigate(-1);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="min-w-[220px]"
        icon={<ArrowLeftOutlined />}
        onClick={() => {
          navigate(-1);
        }}
      >
        Trở lại
      </Button>
      <CreateOrEditNew handleSubmit={handleSubmit} />
      <GeneralLoading isLoading={loading} />
    </>
  );
}