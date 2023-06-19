resource "aws_db_subnet_group" "DB_subnet" {
  name = "db_subnet"
  description = "Subnet para DB"

  subnet_ids = [ "subnet-0d96e4510ba56b82e", "subnet-02b904514be2975e5" ]
}

resource "aws_security_group" "allow_tcp_3306" {
  name        = "allow_tcp_3306"
  description = "Allow tcp_3306 inbound traffic"
  vpc_id = "vpc-0d245bea3e6904d79"

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["10.10.0.0/16"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "myrds" {
    engine = "mysql"
    engine_version = "8.0.32"
    allocated_storage = "20"
    instance_class = "db.t3.micro"
    storage_type= "gp2"
    identifier = "mydb"
    username = var.db_user
    password = var.db_pass
    publicly_accessible = true
    skip_final_snapshot = true
    db_subnet_group_name = aws_db_subnet_group.DB_subnet.id
    vpc_security_group_ids = [aws_security_group.allow_tcp_3306.id]

    tags = {
        Name = "Myrdsdb"
    }
}