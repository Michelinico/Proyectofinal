resource "aws_s3_bucket" "bucket" {
    bucket = "bucket-parking"
    force_destroy = true

    tags = {
        Name = "Mi bucket"
        Enviroment = "Prod"
    }
}