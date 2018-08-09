<?php

  class Database {
    // private $host = 'localhost';
    // private $db_name = 'chat-app';
    // private $username = 'root';
    // private $password = 'root';
    private $host = 'us-cdbr-iron-east-01.cleardb.net';
    private $db_name = 'chat-app';
    private $username = 'b281c93cba5b5b';
    private $password = '35356c10';
    private $conn;

    public function connect() {
      $this->conn = null;

      try {
        $this->conn = new PDO('mysql:host='.$this->host.';dbname='.$this->db_name, $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
      }
      catch (PDOException $e){
        echo 'Connection Error: '.$e->getMessage();
      }

      return $this->conn;
    }

  }
