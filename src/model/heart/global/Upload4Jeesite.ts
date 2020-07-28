import { UploadStatus } from "@/constants/heart/enum/UploadStatus";

/**
 * 针对jeesite上传组件的接口
 * @author zhangx
 */
export default interface UploadInfo4Jeeste {
  bizKey?: string;
  bizType?: string;
  uploadType?: any;
  imageMaxWidth?: number;
  imageMaxHeight?: number;
  chunkSize?: number;
  __ajax?: string;
  fileMd5?: string;
  fileName?: string;
  fileUploadId?: string;
  fileEntityId?: string;
  id?: string;
  name?: string;
  type?: string;
  lastModifiedDate?: Date;
  size?: number;
  file?: string;
  fileSizeFormat?: string;
  // 下面是自定义的值
  uploadStatus?: UploadStatus;
  progress?: number;
}
