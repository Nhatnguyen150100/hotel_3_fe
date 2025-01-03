import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import * as React from 'react'
import GeneralLoading from '../../../../components/base/GeneralLoading';
import destinationService from '../../../../services/destinationService';
import { useNavigate } from 'react-router-dom';
import CreateOrEditDestination from './common/CreateOrEditDestination';

export default function CreateDestination() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const rs = await destinationService.createNew(data);
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
      <CreateOrEditDestination handleSubmit={handleSubmit} />
      <GeneralLoading isLoading={loading} />
    </>
  );
}