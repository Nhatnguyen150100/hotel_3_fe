import * as React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { DEFINE_ROUTERS_ADMIN } from '../../../../constants/route-mapper';
import { INew } from '../../../../types/new.types';
import newService from '../../../../services/newService';
import { Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Visibility from '../../../../components/base/visibility';
import CreateOrEditNew from './common/CreateOrEditNew';
import GeneralLoading from '../../../../components/base/GeneralLoading';
import imagesService from '../../../../services/imagesService';

export default function NewDetailAdmin() {
  const {id} = useParams<{id: string}>();

  const [loading, setLoading] = React.useState(false);
  const [newDetail, setNewDetail] = React.useState<INew>();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (id) {
      handleGetNewDetail();
    }
  }, [id]);

  const handleGetNewDetail = async () => {
    try {
      setLoading(true);
      const rs = await newService.getNew(id!);
      setNewDetail(rs.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: FormData, deleteThumbnail?: string | undefined) => {
    try {
      setLoading(true);
      const rs = await newService.updateNew(id!, data);
      if(deleteThumbnail) await imagesService.deleteImages([deleteThumbnail])
      message.success(rs.message);
      navigate(-1);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if(!id) {
    return <Navigate to={DEFINE_ROUTERS_ADMIN.newsManager} replace />;
  }


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
      <Visibility visibility={Boolean(newDetail?.id)}>
        <CreateOrEditNew item={newDetail} handleSubmit={handleSubmit} />
      </Visibility>
      <GeneralLoading isLoading={loading} />
    </>
  );
}