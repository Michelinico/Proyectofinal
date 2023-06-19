variable "instance_web_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
  default     = "ServidorWeb"
}

variable "db_user" {
  description = "Usuario base datos"
  type = string
  sensitive = true
}

variable "db_pass" {
  description = "Contraseña base datos"
  type = string
  sensitive = true
}