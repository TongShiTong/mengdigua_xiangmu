import {Loading} from 'element-ui'
class MyLoading{
    constructor(){
        this.loadingOption={
            lock: true,
            spinner: 'el-icon-loading',
          };
    }
    close(){
        this.loading.close();
    }
    open(label,text='Loading',bgColor='rgba(0, 0, 0, 0.4)'){
        this.loadingOption.target=label;
        this.loadingOption.background= bgColor;
        this.loadingOption.text=text,
        this.loading=Loading.service(this.loadingOption)
    }
}
export default MyLoading