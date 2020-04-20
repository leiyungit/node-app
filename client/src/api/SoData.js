import Http from './http'
export default {
    login(dto) {
        return http
            .get('/indata/so', {
                adapter: async (config) => {
                    return {
                        data: [
                            {so_id:0,so_no:"P000000", delivery_date: "2016-05-02",prod_no: "A001H001", order_num: "1000", so_reamrk: "remark...abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",create_date: "2016-05-02 12:12:00", modify_date: "2016-05-02 12:12:00" },
                            {so_id:1,so_no:"P000001",prod_no:"SCXH00100001",delivery_date:"2020-05-10",so_num:100,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:2,so_no:"P000002",prod_no:"SCXH00100002",delivery_date:"2020-05-11",so_num:200,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:3,so_no:"P000003",prod_no:"SCXH00100003",delivery_date:"2020-05-12",so_num:300,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:4,so_no:"P000004",prod_no:"SCXH00100004",delivery_date:"2020-05-13",so_num:400,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:5,so_no:"P000005",prod_no:"SCXH00100005",delivery_date:"2020-05-14",so_num:500,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:6,so_no:"P000006",prod_no:"SCXH00100006",delivery_date:"2020-05-15",so_num:600,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:7,so_no:"P000007",prod_no:"SCXH00100007",delivery_date:"2020-05-16",so_num:700,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:8,so_no:"P000008",prod_no:"SCXH00100008",delivery_date:"2020-05-17",so_num:800,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:9,so_no:"P000009",prod_no:"SCXH00100009",delivery_date:"2020-05-18",so_num:900,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:10,so_no:"P000010",prod_no:"SCXH00100010",delivery_date:"2020-05-19",so_num:1000,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:11,so_no:"P000011",prod_no:"SCXH00100011",delivery_date:"2020-05-20",so_num:1100,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:12,so_no:"P000012",prod_no:"SCXH00100012",delivery_date:"2020-05-21",so_num:1200,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:13,so_no:"P000013",prod_no:"SCXH00100013",delivery_date:"2020-05-22",so_num:1300,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:14,so_no:"P000014",prod_no:"SCXH00100014",delivery_date:"2020-05-23",so_num:1400,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:15,so_no:"P000015",prod_no:"SCXH00100015",delivery_date:"2020-05-24",so_num:1500,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:16,so_no:"P000016",prod_no:"SCXH00100016",delivery_date:"2020-05-25",so_num:1600,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:17,so_no:"P000017",prod_no:"SCXH00100017",delivery_date:"2020-05-26",so_num:1700,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:18,so_no:"P000018",prod_no:"SCXH00100018",delivery_date:"2020-05-27",so_num:1800,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:19,so_no:"P000019",prod_no:"SCXH00100019",delivery_date:"2020-05-28",so_num:1900,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:20,so_no:"P000020",prod_no:"SCXH00100020",delivery_date:"2020-05-29",so_num:2000,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:21,so_no:"P000021",prod_no:"SCXH00100021",delivery_date:"2020-05-30",so_num:2100,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:22,so_no:"P000022",prod_no:"SCXH00100022",delivery_date:"2020-05-31",so_num:2200,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:23,so_no:"P000023",prod_no:"SCXH00100023",delivery_date:"2020-05-32",so_num:2300,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:24,so_no:"P000024",prod_no:"SCXH00100024",delivery_date:"2020-05-33",so_num:2400,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:25,so_no:"P000025",prod_no:"SCXH00100025",delivery_date:"2020-05-34",so_num:2500,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:26,so_no:"P000026",prod_no:"SCXH00100026",delivery_date:"2020-05-35",so_num:2600,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:27,so_no:"P000027",prod_no:"SCXH00100027",delivery_date:"2020-05-36",so_num:2700,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:28,so_no:"P000028",prod_no:"SCXH00100028",delivery_date:"2020-05-37",so_num:2800,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"},
                            {so_id:29,so_no:"P000029",prod_no:"SCXH00100029",delivery_date:"2020-05-38",so_num:2900,so_status:"NEW",so_remark:"remark",status:"0",is_sync:"0",create_date:"2020-04-20",modify_date:"2020-04-20"}
                        ],
                        status: 200
                    }
                }
            })
    }
}