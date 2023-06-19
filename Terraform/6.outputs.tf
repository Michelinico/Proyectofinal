output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.app_server.id
}

output "FE_instance_public_ip" {
  description = "Dirección pública del servidor frontend"
  value       = aws_instance.app_server.public_ip
}

output "db_instance_endpoint" {
  value       = aws_db_instance.myrds.endpoint
}