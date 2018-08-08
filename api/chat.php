<?php
  // Header
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET, POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once('./config/database.php');
  include_once('./models/chat.php');

  $METHOD = $_SERVER['REQUEST_METHOD'];

  $response_arr = array();
  $response_arr['data'] = array();

  // connect to database
  $database = new Database();
  $db = $database->connect();

  $chat = new Chat($db);

  switch($METHOD) {
    case "GET":
      // fetch chats
      $result = $chat->read();
      while($row = $result->fetch()) {
        extract($row);
        $chat_item = array(
          "id" => $id,
          "message" => htmlspecialchars($message),
          "username" => htmlspecialchars($username),
          "timestamp" => $time_stamp
        );

        array_push($response_arr['data'], $chat_item);
      }
      $response_arr = array(
        "success" => true,
        "data" => $response_arr['data']
      );

      break;
    case "POST":
      // write a new chat
      $data = json_decode(file_get_contents("php://input"));
      $chat->user_id = $data->user_id;
      $chat->message = $data->message;

      if($chat->user_id) {
        if($chat->create()) {
          // create successfully
          $response_arr = array(
            "success" => true,
            "message" => "Message sent."
          );
        } else {
          // fail to create
          $response_arr = array(
            "success" => false,
            "message" => "There was an error."
          );
        }
      } else {
        // user id not provided, error
        $response_arr = array(
          "success" => false,
          "message" => "Must Provide the user ID."
        );
      }

      break;
    default:
      $response_arr = array(
        "success" => false,
        "message" => "Invalid Request Method."
      );
  }

  echo json_encode($response_arr);