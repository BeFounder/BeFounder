<?php
 $sql="select * from user"; //接收参数
 
 $conn = mysqli_connect("localhost", "root", "qazplm1234","BUAAFOUND"); //连接数据库
 
 $result = mysqli_query($conn, $sql);
 if (mysqli_num_rows($result) > 0) {// 输出数据
 
    while($row = mysqli_fetch_assoc($result)) {

        echo json_encode($row); //将请求结果转换为json格式
    }
}

class Demo extends CI_Controller {
    public function index() {
      
    }
}
