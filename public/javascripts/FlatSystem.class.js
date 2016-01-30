/**
    平面直角坐标系类
    可以轻松在一块画布上画出平面直角坐标系，可设置宽度，高度，绘制比例，以及单位刻度
    构造函数 : FlatSystem
                context： 画布的2d上下文
                width：绘制的最大宽度
                height：绘制的最大高度
    属性设置：
            this.calibration=30 //刻度 可通过 setCalibration(number) 设置 ,这个方法也是对外API之一
            this.proportion=2 //绘制比例  可通过 setProportion(number) 设置这个方法也是对外API之一
    api:
        setCalibration(number);// 设置坐标系刻度
        setProportion();// 设置坐标系绘制比例
        init();//在画布上画出坐标系，如果在init之前没有设置刻度和绘制比例会使用默认的值
        clear(x,y,width,height)//清除画布的某块区域，如果不传递任何值会清空全部画布 
        
        
*/
function FlatSystem(context, width, height){
			
    this.context = context;
    this.width = width;
    this.height = height;
    this.calibration = 50;//刻度
    this.proportion = 2;//绘制比例
    this.jx = 50; //0坐标点的x位置
    this.jy = this.height - 50; //0坐标点的y位置
        
    //this.init();
    
}
FlatSystem.prototype = {
    constructor:FlatSystem,
    init:function(){
        this.context.clearRect(0,0,this.width, this.height);
        //this.width *= this.proportion;
        //this.height *= this.proportion;
        this.context.moveTo(0,0);
        this.setFillColor("#000");
        this.setStrokeColor("#000");
        this.build();
    },
    clear:function(x, y, width, height){
        this.context.clearRect(x ||0,y || 0,width || this.width, height || this.height);
    },
    setProportion:function(proportion){//整数
        this.proportion = proportion;
    },
    setCalibration:function(calibration){
        this.calibration = calibration;//刻度
    },	
    onlyQuadrant:function(quadran){//显示某一象限 1， 2， 3， 4
        if(quadran == 0){
            this.jx = this.width/2;
            this.jy = this.height/2;
        }
        
        if(quadran == 1){
            this.jx = 50;
            this.jy = this.height-50;
        }
        if(quadran == 2){
            this.jx = this.width - 50;
            this.jy = this.height - 50;
        }
        if(quadran == 3){
            this.jx = this.width -50;
            this.jy = 50;
        }
        if(quadran == 4){
            
            this.jx = 50;
            this.jy = 50;
        }
    },
    /**
        在坐标系统打印一个点
        x 轴坐标
        y 轴坐标
        width 点的宽度
        height 点的高度
    */
    printPoint:function(x,y,width,height){//默认点阵宽度2
    
        x = this.getx(x);
        y = this.gety(y);
        
        if(x < this.width &&  y < this.height){
            this.drawRect(x, y, width || 2, height || 2);
            return true;
        }
        return false;
    },
    /***
        在坐标系中画一条直线（线段）
        x 线段结束点 x坐标
        y 线段结束点 y坐标
        
        sx 线段开始点 x坐标 可选 不传递将会使用上次画笔结束点
        sy 线段开始点 y坐标 可选
        
    */
    printLine:function(x, y, sx, sy){
        this.drawLine(this.getx(x), this.gety(y), this.getx(sx),this.gety(sy));
    },
    /**
        设置填充色
    */
    setFillColor:function(color){
        this.context.fillStyle = color;
    },
    /**
        设置边框色
    */
    setStrokeColor:function(color){
        this.context.strokeStyle = color;
    },
    /**
        非公开
    */
    drawRect:function(x,y,width, height){

        this.context.beginPath();
        this.context.fillRect(x-width/2, y-height/2, width, height);
        this.context.stroke();
    },
    /***
        非公开
        在画布打印一个点，坐标为真实开始坐标和结束坐标
    */
    drawLine:function(x, y, sx, sy){//目标x y 开始sx sy
        this.context.beginPath();
        if(sx !== undefined && sy !== undefined ){
            this.context.moveTo(sx,sy);
        }
        //this.context.beginPath();
        this.context.lineTo(x, y);
        this.context.stroke();
    },
    fillText:function(text, x, y){
        this.context.fillText(text, this.getx(x), this.gety(y));
    },
    build:function(){//构建坐标系

        this.drawLine(this.jx, this.height, this.jx, 0);// y
        this.drawLine(0, this.jy, this.width,  this.jy);// x
        this.setFillColor('#d8d8d8');
        this.fillText("O", this.jx+5 , this.jy+10);//原点坐标 0
        this.buildCoordinate();// +x height/2
        
    },
    buildCoordinate:function(){//构建坐标系中的刻度和数字
        
        
        var calibration = this.calibration * this.proportion;//calibration 最小刻度
        var width = this.width;
        var height = this.height;
        
        // len = 中心点到4个最远点的最大绝对值 / 最小间隔单位
        var len = Math.max(
                    Math.max( Math.abs(this.getx(0) - width), Math.abs(this.getx(0) - 0) ), //x轴绝对最大值
                    Math.max( Math.abs(this.gety(0) - height ), Math.abs(this.gety(0) - 0) ) //y轴绝对最大值
                )*this.proportion / calibration;


        //this.setFillColor('#d8d8d8');
        var fixed = this.proportion >= 1 ? function(x){//对于绘制比例小于1 处理小位数
            return x;
        } : function(x){ return (x).toFixed(1);};
        
        
        
        var j=0;//中间变量
        var d = 0;
        var sx=0;
        var sy=0; 

        this.context.textBaseline = "middle";
        this.setFillColor('#d8d8d8');
        for(var i=1; i<=len;i++){//注释过的代码都是适当优化过的 其实等于没优化

            j = String(fixed(calibration*i));
            //console.log(typeof j);
            sx = this.getx(calibration*i);//第一象限
            sy = this.gety(0);
            
            this.drawLine(sx, sy, sx, sy-5);
            this.context.textAlign = "center";
            this.context.fillText(j, sx, sy+10);
            /***/
            
            sx = this.getx(-calibration*i);//第3象限
            //sy = this.gety(0);
            this.drawLine(sx, sy, sx, sy-5);
            this.context.fillText(j, sx, sy+10);
            /***/
            sx = this.getx(0);//第4象限
            sy = this.gety(-calibration*i);
            
            this.drawLine(sx, sy, sx-5, sy);
            this.context.textAlign = "left";
            this.context.fillText(j, sx+5, sy);
            /***/
            
            //sx = this.getx(0);//第2象限
            sy = this.gety(calibration*i);
            
            this.drawLine(sx, sy, sx-5, sy);
            this.context.fillText(j, sx+5, sy);
            /***/
        }


    },
    isIn:function(x, y){
        var x = this.getx(x);
        var y = this.gety(y);
        return x>=0 && x <= this.width && y>=0 && y<= this.height;
    },
    /**
        获取真实x坐标
    */
    getx:function(x){
        return parseInt(this.jx+(x/this.proportion));
    },
     /**
        获取真实x坐标
    */
    gety:function(y){
        return parseInt(this.jy-(y/this.proportion));
    }
};