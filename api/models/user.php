<?php

  class User {
    private $conn;
    private $table = 'users';

    public $id;
    public $username;
    public $password;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function exist() {
      $query = "SELECT * FROM $this->table WHERE username = :username";

      $stmt = $this->conn->prepare($query);

      $stmt->execute([
        "username" => $this->username
      ]);

      if($stmt->rowCount()) {
        // return true if username already exists
        return true;
      }

      return false;
    }

    public function create() {
      $password_hash = password_hash($this->password, PASSWORD_DEFAULT);

      $query = "INSERT INTO $this->table (username, password) VALUES (:username, :password)";

      $stmt = $this->conn->prepare($query);

      if($stmt->execute([
        "username" => $this->username,
        "password" => $password_hash
      ])) {
        return true;
      }

      return false;
    }

    public function auth() {
      $query = "SELECT * FROM $this->table WHERE username = :username LIMIT 1";

      $stmt = $this->conn->prepare($query);

      $stmt->execute([
        "username" => $this->username
      ]);

      $row = $stmt->fetch();
      extract($row);

      $hashed_password = $password;

      if(password_verify($this->password, $hashed_password)) {
        return $row;
      }

      return false;
    }

  }
