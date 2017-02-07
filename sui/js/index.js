$(function(){
    'use strict';
	var global_info={};
    /****首页构建**/   
       var main_page_build={
           init:function(){
               var main_slip = Slip(document.getElementById('main_page_content'), 'x');
               main_slip.webapp(document.querySelectorAll('.swipe-box'));
               $(".bottom-bar").find('a').on('click',function(){
                  main_slip.jump($(this).index());
               });

               main_slip.end(function(){
                   var do_lists=[['bottom-bar-use','use'],['bottom-bar-analysis','analysis'],['bottom-bar-manage','manage']];
                   var bottom_bar=$('.bottom-bar');
                   bottom_bar.find('.tab-item').removeClass('active');
                   $(do_lists).each(function(){
                      $('#'+this[0]).find('.icon-d').removeClass(this[1]+'-a').addClass(this[1]);
                   })
                   $('#'+do_lists[this.page][0]).addClass('active').find('.icon-d').addClass(do_lists[this.page][1]+'-a');
               })
               var page1_list=$('#main_page_1').height()-$("#main_page_1_top").height();
               if($('#use-app-list').height()>page1_list){
                   $('#use-app-list').height(page1_list);
               }
               $(".panel_add_baby").on('click',function(){
                    $.closePanel(function(){$.router.load("#baby-add")});
                    // $.router.load('#baby_add');
               })
               
               $('#del-baby-btn').on('click',function(){
                   $.confirm('是否删除当前账号?',function(){
                       /**删除账号*/
                       alert(1);
                   })
               })
               this.page_one_poll();
           },
           page_one_poll:function(){
            var time =global_info.now_child.online_time;
            $('#clock_show_data').html(time);
           },

       }
       // $('.analysis-result-list').scroller({type:'js'});

   /**获取儿童初始化数据*/
 //  $.post('/app/child_mode/child_mode_info_get.cgi',{},function(data){
        global_info.child_list=[];
       var data=[{
            id:1,
            name:'wang',
            sex:'nan',
            age:'15',
            online_time:'12',
            time_status:'2',      
            dev_list:[{
                host_name:'aaa',
                mac:'255.255',
                os_type:'leixin',
                is_online:'1',
                remain_time:'10'
            }]}
        ];

        global_info.child_list=data;
        if(global_info.child_list.length > 0){
            $.router.load("#sec-app-use");
            global_info.now_child=data[0];
            main_page_build.init();
        }else{
             $.router.load("#item-content-null");
        }
  // })
   
    $.init();

 

/***********分析页***/    
    //创建分析页canvas
    function drawCircle(canvasId, data_arr,  total_time) {  
        var color_arr = ["#f2604d", "#92db49", "#3898d6", "#f3c637","#f7a449"];  
        var c = document.getElementById(canvasId);  
        var ctx = c.getContext("2d");  
    
        var radius = c.height / 2 ; //半径  
        var ox = radius , oy = radius ; //圆心  
        var nradius=radius-30;  //内环半径
        var width = 30, height = 10; //图例宽和高  
        var posX = ox * 2 + 20, posY = 30;   //  
       // var textX = posX + width + 5, textY = posY + 10;  
        var textX= c.width/2-(total_time.length*10/2);

        var startAngle = 0; //起始弧度  
        var endAngle = 0;   //结束弧度  
        for (var i = 0; i < data_arr.length; i++)  
        {  
            //绘制饼图  
            endAngle = endAngle + data_arr[i] * Math.PI * 2; //结束弧度  
            ctx.fillStyle = color_arr[i];  
            ctx.beginPath();  
            ctx.moveTo(ox, oy); //移动到到圆心  
            ctx.arc(ox, oy, radius, startAngle, endAngle, false);  
            ctx.closePath();  
            ctx.fill();  
            startAngle = endAngle; //设置起始弧度  
        }
        
        ctx.beginPath();  
        ctx.fillStyle='#fff';
        ctx.moveTo(ox, oy);
        ctx.arc(ox,oy,nradius,0,2*Math.PI) ; 
        ctx.closePath();  
        ctx.fill();

        ctx.beginPath()
        ctx.fillStyle='#999';
        ctx.font = "15px serif";
        ctx.fillText("合计上网", 45, 60);
        ctx.closePath()

        ctx.fillStyle='#000';
        ctx.font = "20px serif";
        ctx.fillText(total_time, textX, 90);
    } 

    drawCircle("analysis-canvas",[0.2, 0.2, 0.2, 0.2,0.2],  '11:22')
    drawCircle("analysis-canvas",[0.1, 0.1, 0.1, 0.1,0.6],  '22:33')

    /***时间设置页****/
    function time_set_enable() {
        $('.week-btn').each(function(){
            var _self=$(this);
            _self.on('click',function(){
                if(_self.hasClass('blue-week-btn')){
                    _self.removeClass('blue-week-btn')
                }else{
                    _self.addClass('blue-week-btn');
                }
            })
        });
        $("#time-during").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker"style="color:#fff";>确定</button>\
            <h1 class="title" style="color:#fff;">设置上网时长</h1>\
            </header>',
            cols: [
            {
             textAlign: 'center',
             values: ['0', '1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
            },
            {
             textAlign: 'center',
             values: [':']
            },
            {
             textAlign: 'center',
             values: ['00','10','20','30','40','50']
            },
            ]
        });
        $("#start-time,#end-time").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker"style="color:#fff";>确定</button>\
            <h1 class="title" style="color:#fff;">设置上网时段</h1>\
            </header>',
            cols: [
            {
             textAlign: 'center',
             values: ['0', '1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','23']
            },
            {
             textAlign: 'center',
             values: [':']
            },
            {
             textAlign: 'center',
             values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']
            },
            ]
        });

    }
    time_set_enable();

});