resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.app_server.id
  allocation_id = "eipalloc-01532c7073f734375"
}

resource "aws_instance" "app_server" {
  ami           = "ami-053b0d53c279acc90"
  instance_type = "t2.micro"

  tags = {
    Name = var.instance_web_name
  }

  user_data = "${file("script-php-local.sh")}"
  key_name  = "AccesoWeb"
  subnet_id = "subnet-034ab39fe3d2795e1"
  security_groups = [ "sg-08b919491645d7549" ]
}