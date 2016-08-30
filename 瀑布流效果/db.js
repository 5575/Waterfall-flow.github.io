var BlogType = db.model('blog_type',{
    name:{type:String,required:true},
    order_num:{type:Number,default:0},
    img:{type:String,default:""},
    remarks:{type:String,default:""},
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
})
var Blog = db.model('blog',{
    title:{type:String,default:""},
    type:{type:String,default:""},
    description:{type:String,default:""},
    tags:{type:String,default:""},
    img:{type:String,default:""},
    view_times:{type:Number,default:0},
    content:{type:String,default:""},
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now},
})
///模块导出