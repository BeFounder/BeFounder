<?php
$code = $_GET['code']; //接收参数

$url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxbd77164883923d58&secret=dcb040b8cbbefd9da8c491695d944349&js_code={$code}&grant_type=authorization_code";

$info = file_get_contents($url); //发送HTTPs请求并获取返回的数据
$json = json_decode($info); //对json数据解码
$arr = get_object_vars($json);
$openid = $arr['openid'];
$session_key = $arr['session_key'];

$data = array('openid' => $openid, 'session_key' => $session_key);

$return_data = json_encode($data);

echo $return_data;

class Getopenid extends CI_Controller {
    public function index() {

    }
}