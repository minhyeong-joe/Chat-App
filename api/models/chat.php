<?php

  class Chat {
    private $conn;
    private $table = 'chat';

    // public $id;
    public $message;
    public $user_id;
    // public $username;
    // public $time_stamp;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function read() {
      $query = "SELECT c.id, c.message, c.time_stamp, u.username
                FROM $this->table c
                JOIN `users` u ON c.user_id = u.id
                ORDER BY `time_stamp` DESC LIMIT 50";

      $stmt = $this->conn->prepare($query);

      $stmt->execute();

      return $stmt;
    }

    public function create() {
      $query = "INSERT INTO $this->table (message, user_id) VALUES (:message, :user_id)";

      $stmt = $this->conn->prepare($query);

      if ($stmt->execute([
        "message" => $this->message,
        "user_id" => $this->user_id
      ])) {
        return true;
      }

      return false;
    }

  }
