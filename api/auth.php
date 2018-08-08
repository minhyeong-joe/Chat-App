<?php
  // Header
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
        // if the username is found
        if($row = $user->auth()) {
          // user has been authenticated
          extract($row);
          $user_data = array(
            "user_id" => htmlspecialchars($id),
            "username" => htmlspecialchars($username)
          );
          array_push($response_arr['data'], $user_data);

          $response_arr = array(
            "success" => true,
            "data" => $response_arr['data']
          );
        } else {
          // incorrect password
          $response_arr = array(
            "success" => false,
            "message" => "Incorrect password."
          );
        }
      } else {
        $response_arr = array(
          "success" => false,
          "message" => "Username does not exist."
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
