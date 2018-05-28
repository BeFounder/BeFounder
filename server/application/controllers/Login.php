<?php
 header ( "Content-type:text/html;charset=utf8" );
 $sql=$_GET['sql']; //接收参数
 
 $conn = mysqli_connect("localhost", "root", "qazplm1234","BUAAFOUND"); //连接数据库
 
 mysqli_query($conn,'set names utf8');
 $result = mysqli_query($conn, $sql);
 if (!is_bool($result) && mysqli_num_rows($result)) {// 输出数据
 
    while($row = mysqli_fetch_assoc($result)) {

        echo json_encode($row); //将请求结果转换为json格式
    }
}
else
    echo json_encode($sql);

class Login extends CI_Controller {
    public function index() {
      
    }
}
