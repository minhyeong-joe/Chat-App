<?php
  // Header
  $http_origin = $_SERVER['HTTP_ORIGIN'];

  if ($http_origin == "http://localhost:3000" || $http_origin == "https://itok-chat-app.herokuapp.com")
  {
    header("Access-Control-Allow-Origin: $http_origin");
  }
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET, POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once('./config/database.php');
  include_once('./models/user.php');

  $METHOD = $_SERVER['REQUEST_METHOD'];

  $response_arr = array();
  $response_arr['data'] = array();

  // connect to database
  $database = new Database();
  $db = $database->connect();

  $user = new User($db);

  switch($METHOD) {
    case "POST":
      // user authentication
      $data = json_decode(file_get_contents("php://input"));
      $user->username = $data->username;
      $user->password = $data->password;

      if($user->exist()) {
        // username already exists
        $response_arr = array(
          "success" => false,
          "message" => "Username already taken."
        );
      } else {
        if ($user->create()) {
          // successfully registered
          $response_arr = array(
            "success" => true,
            "message" => "A new user created."
          );
        } else {
          // failed to register
          $response_arr = array(
            "success" => false,
            "message" => "An error has occurred."
          );
        }
      }

      break;
    default:
      $response_arr = array(
        "success" => false,
        "message" => "Invalid Request Method."
      );
  }

  echo json_encode($response_arr);
