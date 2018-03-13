var RN=4,CN=4;//定义总行数，总列数
var data;//定义变量data保存二维数组
var score=0;//保存得分
var status=0;//保存游戏状态
//0: 表示游戏结束， 1: 表示运行中
const RUNNING=1,GAMEOVER=0;
//启动游戏
function start(){
  //将游戏状态重置为运行中
  status=RUNNING;
  score=0;//将得分归零
  data=[];//创建空数组保存在data中
  //r从0到<RN
  for(var r=0;r<RN;r++){
    //向data中压入一个空的子数组
    data.push([]);
    //c从0到<CN结束
    for(var c=0;c<CN;c++){
      //为data中r行c位置保存一个0
      data[r][c]=0;
    }
  }
  //随机生成2个2或4
  randomNum(); randomNum();
  //将data中的数据更新到页面div中
  updateView();
  //为当前页面添加键盘按下事件处理函数
  document.onkeydown=function(e){
    switch(e.keyCode){//判断按键号:
      case 37://左
        moveLeft();
        break;
      case 38://上
        moveUp();
        break;
      case 39://右
        moveRight();
        break;
      case 40://下
        break;
    }
  }
}
//将data中的每个元素填写到页面的对应div中
function updateView(){
  for(var r=0;r<RN;r++){//遍历data
    for(var c=0;c<RN;c++){
      //用r,c拼对应div的id
      var id="c"+r+c;
      var div=//用id找到对应div
        document.getElementById(id);
      //如果data中r行c列不为0
      if(data[r][c]!=0){
        //将data中r行c列的值保存到div的内容
        div.innerHTML=data[r][c];
        //设置div的class为n+data[r][c]
        div.className="n"+data[r][c];
      }else{//否则，清空div的内容
        div.innerHTML="";
        //清除div的class
        div.className="";
      }

    }
  }
  //设置id为score的span的内容为score
  var span=
    document.getElementById("score");
  span.innerHTML=score;
  var div=
    document.getElementById("gameover");
  //如果游戏结束
  if(status==GAMEOVER){
    //找到id为final的span，设置其内容为score
    var span=
      document.getElementById("final");
    span.innerHTML=score;
    //就设置gameoverdiv显示
    div.style.display="block";
  }else//否则
    //就设置gameoverdiv隐藏
    div.style.display="none";
}
//在data中一个随机位置生成2或4
function randomNum(){
  while(true){//反复
    //在0~RN-1之间生成一个随机整数保存在r
    var r=parseInt(Math.random()*RN);
    //在0~CN-1之间生成一个随机整数保存在c
    var c=parseInt(Math.random()*CN);
    //如果data中r行c列的值为0
    if(data[r][c]==0){
      //为data中r行c列随机保存一个2或4
      data[r][c]=
        Math.random()<0.5?2:4;
      break;//退出循环
    }
  }
}
//左移所有行
function moveLeft(){
  //将data转为字符串保存在before中
  var before=String(data);
  for(var r=0;r<RN;r++){//r从0到<RN
    moveLeftInRow(r);//左移第r行
  }
  //将data转为字符串保存在after中
  var after=String(data);
  //如果before不等于after
  if(before!=after){
    randomNum();//随机生成一个2或4
    //如果游戏结束
    if(isGAMEOVER())
      //修改游戏状态为GAMEOVER
      status=GAMEOVER;
    updateView();//更新页面
  }
}
//左移第r行
function moveLeftInRow(r){
  //c从0开始，到<CN-1
  for(var c=0;c<CN-1;c++){
    //找r行c右侧下一个不为0的位置nextc
    var nextc=getNextcInRow(r,c);
    //如果没找到，就退出循环
    if(nextc==-1) break;
    else{//否则
      //如果c位置的值为0
      if(data[r][c]==0){
        //将nextc位置的值赋值给c位置
        data[r][c]=data[r][nextc];
        //将nextc位置的值置为0
        data[r][nextc]=0;
        c--;//将c-1
      }else if(data[r][c]
                ==data[r][nextc]){
      //否则如果c位置的值等于nextc位置的值
        //将c位置的值*2
        data[r][c]*=2;
        //将*2后的元素值累加到score中
        score+=data[r][c];
        //将nextc位置的值置为0
        data[r][nextc]=0;
      }
    }
  }
}
//找r行c列右侧下一个不为0的位置
function getNextcInRow(r,c){
  //nextc从c+1开始,到<CN结束
  for(var nextc=c+1;nextc<CN;nextc++){
    //如果data中r行nextc位置不等于0
    if(data[r][nextc]!=0)
      return nextc;//就返回nextc
  }
  return -1;//返回-1
}
//右移所有行
function moveRight(){
  //将data转为字符串保存在before中
  var before=String(data);
  //r从0开始，到<RN结束
  for(var r=0;r<RN;r++) {
    moveRightInRow(r);//右移第r行
  }
  //将data转为字符串保存在after中
  var after=String(data);
  //如果before不等于after时
  if(before!=after) {
    randomNum();//随机生成2或4
    //如果游戏结束
    if(isGAMEOVER())
    //修改游戏状态为GAMEOVER
      status=GAMEOVER;
    updateView();//更新页面
  }
}
//右移第r行
function moveRightInRow(r){
  //c从CN-1开始，到>0结束,递减1
  for(var c=CN-1;c>0;c--){
    //查找r行c列左侧前一个不为0的位置prevc
    var prevc=getPrevcInRow(r,c);
    //如果没找到就退出循环
    if(prevc==-1) break;
    else{//否则
      //如果c位置的值为0
      if(data[r][c]==0){
        //用prevc位置的值代替c位置的值
        data[r][c]=data[r][prevc];
        //将prevc位置的值置为0
        data[r][prevc]=0;
        c++;//c+1
      }else if(data[r][c]
                ==data[r][prevc]){
      //否则如果c位置的值等于prevc位置的值
        //将c位置的值*2
        data[r][c]*=2;
        //将*2后的元素值累加到score中
        score+=data[r][c];
        //将prevc位置的值置为0
        data[r][prevc]=0;
      }
    }
  }
}
//查找r行c列左侧前一个不为0的位置
function getPrevcInRow(r,c){
  //prevc从c-1开始，到>=0，递减1
  for(var prevc=c-1;prevc>=0;prevc--){
    //如果data中r行prevc位置的值不等于0
    if(data[r][prevc]!=0)
      return prevc;//返回prevc
  }
  return -1;//返回-1
}
//上移所有列
function moveUp(){
  //将data转为字符串保存在before中
  var before=String(data);
  //c从0到<CN
  for(var c=0;c<CN;c++){
    moveUpInCol(c);//上移第c列
  }
  //将data转为字符串保存在after中
  var after=String(data);
  //如果before不等于after
  if(before!=after){
    randomNum();//随机生成一个2或4
    //如果游戏结束
    if(isGAMEOVER())
    //修改游戏状态为GAMEOVER
      status=GAMEOVER;
    updateView();//更新页面
  }
}
//上移第c列
function moveUpInCol(c){
  //r从0到<RN-1
  for(var r=0;r<RN-1;r++){
    //找r行c列下方下一个不为0的位置nextr
    var nextr=getNextrInCol(r,c);
    //如果没找到,就退出循环
    if(nextr==-1) break;
    else{//否则
      //如果r行c列的值为0
      if(data[r][c]==0){
        //就用nextr行c列的值代替r行c列
        data[r][c]=data[nextr][c];
        //将nextr行c列的值置为0
        data[nextr][c]=0;
        r--;//r留在原地
      }else if(data[r][c]
                ==data[nextr][c]){
      //否则如果r行c列的值等于nextr行c列的值
        //就将r行c列的值*2
        data[r][c]*=2;
        //将*2后的元素值累加到score中
        score+=data[r][c];
        //将nextr行c列的值置为0
        data[nextr][c]=0;
      }
    }
  }
}
//查找r行c列下方下一个不为0的位置
function getNextrInCol(r,c){
  //nextr从r+1开始,到<RN结束
  for(var nextr=r+1;nextr<RN;nextr++) {
    //如果nextr行c列的值不为0
    if(data[nextr][c]!=0)
      return nextr;//就返回nextr
  }
  return -1;//返回-1
}
//判断游戏是否结束
function isGAMEOVER(){
  //遍历data
  for(var r=0;r<RN;r++){
    for(var c=0;c<CN;c++){
      //如果当前元素是0，就返回false
      if(data[r][c]==0) return false;
      //如果c<CN-1且当前元素等于右侧元素
      if(c<CN-1
          &&data[r][c]==data[r][c+1])
        return false;//就返回false
      //如果r<RN-1且当前元素等于下方元素
      if(r<RN-1
          &&data[r][c]==data[r+1][c])
        return false;//就返回false
    }
  }
  return true;//返回true
}
start();