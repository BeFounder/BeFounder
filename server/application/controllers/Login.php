<?php
 header ( "Content-type:text/html;charset=utf8" );
 $sql=$_GET['sql']; //接收参数
 
 $conn = mysqli_connect("localhost", "root", "qazplm1234","BUAAFOUND"); //连接数据库
 
 mysqli_query($conn,'set names utf8');
 $result = mysqli_query($conn, $sql);

 $arr = array(); 

 if (!is_bool($result) && mysqli_num_rows($result)) {// 输出数据
 
    while($row = mysqli_fetch_assoc($result)) {
        $arr[] = $row;
    }
    
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE); //将请求结果转换为json格式

mysqli_close($conn);

class Login extends CI_Controller {
    public function index() {
      
    }
}
