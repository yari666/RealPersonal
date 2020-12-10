// 区域三级联动
import { AreaList } from '~/config/api.js';

let Area = {
    data() {
        return {
            areaData: {},
            province: '',
            city: '',
            country: ''
        }
    },
    created() { },
    methods: {
        getAreaList() {
            AreaList().then(res => {
                console.log(res);
            })
        }
    }
};
