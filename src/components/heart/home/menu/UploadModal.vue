<template>
  <div class="upload-modal">
    <Upload
      multiple
      type="drag"
      action="/file/upload"
      :before-upload="handleUpload"
      ref="uploadBox"
      id="uploadBox"
      class="uploadBox"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52"></Icon>
        <p>上传文件</p>
      </div>
    </Upload>
    <div class="fileListBox" ref="fileListBox">
      <Row v-for="item in fileList" :key="item.fileUploadId">
        <Col span="11">
          <p class="textEllipsis" v-text="item.fileName"></p>
        </Col>
        <Col span="2">
          <p
            class="textEllipsis"
            v-text="item.fileSizeFormat ? item.fileSizeFormat : '未知'"
          ></p>
        </Col>
        <Col span="7">
          <Progress
            :percent="item.progress"
            :stroke-width="10"
            :status="
              item.uploadStatus === uploadStatusParse.loading
                ? 'active'
                : item.uploadStatus === uploadStatusParse.failure
                ? 'wrong'
                : 'success'
            "
          >
          </Progress>
        </Col>
        <Col span="4">
          <Button
            type="text"
            @click="upload(item, item.file)"
            v-if="uploadStatusParse.failure === item.uploadStatus"
            >重试</Button
          >
          <Button
            type="text"
            @click="download(item.id)"
            v-if="uploadStatusParse.success === item.uploadStatus"
            >预览</Button
          >
          <Button
            type="text"
            @click="deleteFile(item.id)"
            v-if="uploadStatusParse.success === item.uploadStatus"
            >删除</Button
          >
        </Col>
      </Row>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Upload, Button, Icon, Message, Progress, Row, Col } from "view-design";
import { Md5 } from "md5-typescript";
import Request from "../../../../decorator/heart/request/Request";
import {
  RequestMethod,
  ParamMode
} from "../../../../constants/heart/enum/RequestEnums";
import Upload4Jeesite from "../../../../model/heart/global/Upload4Jeesite";
import UploadInfo4Jeeste from "../../../../model/heart/global/Upload4Jeesite";
import { UploadStatus } from "../../../../constants/heart/enum/UploadStatus";
import RequestFactory from "../../../../utils/heart/RequestFactory";

@Component({
  name: "upload-modal",
  components: {
    Upload,
    Button,
    Icon,
    Message,
    Progress,
    Row,
    Col
  }
})
export default class UploadModal extends Vue {
  /* ！！！！！！！！注：bizKey、bizTYpe、uploadModalHeight这仨值需要从父组件传过来 ！！！！！！！！！！！！*/
  // @Prop()
  // bizKey: string = "1286542627743350784";
  // @Prop()
  // bizType: string = "sbosEduFile";
  // @Prop()
  // uploadModalHeight?: number = 115;
  /* 这里的bizKey和bizType是省局项目sbos-普通涉密人员-日常管理-保密教育培训-grid广州市-测试两下 */
  bizKey = "1250591760890486784";
  bizType = "sbosEduFile";
  uploadModalHeight?: number = 460;

  fileList: Array<UploadInfo4Jeeste> = [];
  file: any = null;
  file4BinarySize: number = 10 * 1024 * 1024;
  putFile: Upload4Jeesite = {};
  uploadStatusParse: any = {
    beforeUpload: UploadStatus.BEFORE_UPLOAD,
    loading: UploadStatus.UPLOADING,
    success: UploadStatus.SUCCESS,
    failure: UploadStatus.FAILURE
  };
  handleUpload(file: any): boolean {
    (async () => {
      const putFile: UploadInfo4Jeeste = {
        fileName: file.name,
        uploadStatus: UploadStatus.UPLOADING,
        progress: 0
      };
      this.fileList.push(putFile);
      const tempMd5 = await this.getMd5(file);
      putFile.fileMd5 = tempMd5;
      this.upload(putFile, file);
    })();
    return false;
  }
  getMd5(file: any): any {
    // 传入当前文件，解析当前文件，看是否>10m，是就截取，不是就直接返回md5值
    /* 总体返回一个promise对象，因为读取文件需要时间，所以需要同步
        这里是用二进制读取，所以fileReader.readAsBinaryString(file);
        判断是否<10m，
        1是，直接读取传入完整的文件
        2否，进行截取前面10m
        3.读取的fun，先判断是否还是同一文件（用大小判断），不一致就返回不行
    */
    const $this = this as any;
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = function(e) {
        // 文件读取成功完成时触发
        // file.size === e.target.length
        // 判断是否同一个文件（是否未改动）---长度
        // 这里e的结果只能是10m或者是文件的大小
        if (
          file.size !== (e.target.result as any).length &&
          $this.file4BinarySize !== (e.target.result as any).length
        ) {
          (Message as any).warning("读取文件出错");
          reject(null);
        } else {
          // 计算md5值返回
          resolve(Md5.init(e.target.result));
        }
      };
      if (file.size <= this.file4BinarySize) {
        fileReader.readAsBinaryString(file);
      } else {
        // 超过10M，进行分割，只要前10m
        const blobSlice =
          File.prototype.slice ||
          (File as any).prototype.mozSlice ||
          (File as any).prototype.webkitSlice;
        // readAsBinaryString将文件读取为二进制码，（文件，开始位置，截取长度）
        // 使用此方法，在读取完文件后，自动调用fileReader.onload方法
        fileReader.readAsBinaryString(
          blobSlice.call(file, 0, this.file4BinarySize)
        );
      }
    });
  }

  async upload(putFile: UploadInfo4Jeeste, file: any) {
    /* 被list调用来自动上传的函数 */
    if (putFile.fileMd5 !== "" && putFile.fileName !== "") {
      putFile.uploadStatus = UploadStatus.UPLOADING;
      const result = await this.checkMd5(putFile);
      // 绝对保证能得到file，保证重试时的能被给到
      putFile.file = file;
      if (!result) {
        this.uploadFile(putFile);
      }
    }
  }

  @Request(
    "/file/upload",
    RequestMethod.POST,
    ParamMode.FORM_DATA,
    (putFile: UploadInfo4Jeeste, error: any) => {
      putFile.uploadStatus = UploadStatus.FAILURE;
      return true;
    }
  )
  checkMd5(putFile: UploadInfo4Jeeste, data?: any): boolean {
    if (data.result === "true") {
      // 之前上传过此文件，直接成功了
      putFile.uploadStatus = UploadStatus.SUCCESS;
      putFile.progress = 100;
      const msg: string = data.message ? data.message : "上传成功!";
      // (Message as any).success(msg);
      /* 如若这里“秒传成功”，则需要把传回来的值附上去，至少要有fileId,下载时需要用 */
      putFile.fileUploadId = data.fileUpload.id;
      if (data.fileUpload.fileEntity) {
        putFile.fileSizeFormat = this.dofileSizeParse(
          data.fileUpload.fileEntity.fileSize
        );
        putFile.fileEntityId = data.fileUpload.fileEntity.id;
      }
      return true;
    }
    ///
    putFile.bizKey = this.bizKey;
    putFile.bizType = this.bizType;
    putFile.uploadType = "all";
    putFile.chunkSize = 10485760;
    putFile.__ajax = "json";

    return false;
  }
  @Request(
    "/file/upload",
    RequestMethod.POST,
    ParamMode.FORM_DATA,
    (putFile: UploadInfo4Jeeste, error: any) => {
      putFile.uploadStatus = UploadStatus.FAILURE;
      return;
    },
    (putFile: UploadInfo4Jeeste, event: ProgressEvent) => {
      /* 第四个参数(返回两个参数1文件2事件)，返回来axios的事件是进度内容，在这里进行进度条的赋值 */
      const number = Math.floor((event.loaded / event.total) * 100);
      putFile.progress = number;
    }
  )
  uploadFile(putFile: UploadInfo4Jeeste, data?: any): void {
    /* 标记请求修饰器，发请求，传参数在第一个参数，只能是一个对象，所有参数包含在里面 */
    if (data.result === "true") {
      putFile.uploadStatus = UploadStatus.SUCCESS;
      // 之前上传过此文件，直接成功了
      putFile.fileUploadId = data.fileUpload.id;
      if (data.fileUpload.fileEntity) {
        putFile.fileSizeFormat = this.dofileSizeParse(
          data.fileUpload.fileEntity.fileSize
        );
        putFile.fileEntityId = data.fileUpload.fileEntity.id;
      }

      const msg: string = data.message ? data.message : "上传成功!";
      // (Message as any).success(msg);
      return;
    }
    putFile.uploadStatus = UploadStatus.FAILURE;
    return;
  }
  // 下载文件
  download(id, data: UploadInfo4Jeeste) {
    // 这里应该传一个id
    const url = `${RequestFactory.buildBaseURL()}/file/download/${id}?__sid=${
      this.$store.getters["user/getToken"]
    }`;
    window.open(url);
  }
  @Request("/file/fileList/", RequestMethod.GET)
  getFileList(params: any, data?: any) {
    const $this = this as any;
    data.forEach(item => {
      const temp: UploadInfo4Jeeste = {};
      temp.bizKey = item.bizKey;
      temp.bizType = item.bizType;
      temp.uploadType = "all"; /* 一般是all */
      // temp.imageMaxWidth = item.bizKey; /* =================== */
      // temp.imageMaxHeight = item.bizKey;/* ================ */
      temp.chunkSize = 10485760; /* 这个好像是jeesite写死的10485760 */
      temp.__ajax = "json"; /* 写死json,这个是jeesite的规定 */
      temp.fileName = item.fileName;
      temp.fileUploadId = item.id; /* 这里直接是data.id */
      temp.id = item.id;
      temp.name = item.fileName;
      temp.type = item.fileType;
      temp.lastModifiedDate = item.updateDate;
      temp.file = item.file;
      if (item.fileEntity) {
        temp.fileMd5 = item.fileEntity.fileMd5;
        temp.fileEntityId = item.fileEntity.id;
        temp.size = item.fileEntity.fileSize;
        temp.fileSizeFormat = $this.dofileSizeParse(item.fileEntity.fileSize);
      }
      temp.uploadStatus = this.uploadStatusParse.success;
      temp.progress = 100;
      this.fileList.push(temp);
    });
  }
  dofileSizeParse(val: number): string {
    const KB = 1024;
    const MB = 1024 * KB;
    const GB = 1024 * MB;
    let fileSizeParse = "";
    if (val < KB) {
      fileSizeParse = `${val}B`;
    } else if (val >= KB && val < MB) {
      fileSizeParse = `${(val / KB).toFixed(1)}KB`;
    } else if (val >= MB && val < GB) {
      fileSizeParse = `${(val / MB).toFixed(1)}MB`;
    } else if (val >= GB) {
      fileSizeParse = `${(val / GB).toFixed(1)}GB`;
    }
    return fileSizeParse;
  }
  deleteFile(id: string) {
    this.fileList.some((item: UploadInfo4Jeeste, index: number) => {
      if (item.id === id) {
        this.fileList.splice(index, 1);
        return true;
      }
      return false;
    });
  }
  created() {
    const bizKey = this.bizKey;
    const bizType = this.bizType;
    // let bizKey = "1248884448124768256";
    // let bizType = "fileUploadCheckFile";
    const params = { bizKey, bizType };
    // 每次都清空fileList
    this.fileList = [];
    this.getFileList(params);
  }
  mounted() {
    this.$nextTick(() => {
      /* 给组件各元素高度,模块高度从父组件获得,上传组件是115固定，算fileList高度 */
      const uploadBoxH = (document.querySelector(".uploadBox") as any)
        .offsetHeight;
      const fileListBoxH = this.uploadModalHeight - uploadBoxH;
      (document.querySelector(".fileListBox") as any).style.height =
        fileListBoxH + "px";
    });
  }
}
</script>
<style lang="scss">
.upload-modal {
  .Upload {
    position: fixed;
    top: 0;
    margin-bottom: 10px;
  }
  .fileListBox {
    overflow-y: auto;
    // background: #00aea0;
    .textEllipsis {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .ivu-btn.ivu-btn-text {
      padding: 0;
      text-align: center !important;
      height: 22px;
      vertical-align: top;
      margin-right: 10px;
    }
  }
}
</style>
