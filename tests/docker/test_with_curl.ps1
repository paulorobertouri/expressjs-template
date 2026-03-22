$ErrorActionPreference = "Stop"

$image = "expressjs-template-e2e"
$container = "expressjs-template-e2e-container"

try {
  docker build -f docker/build.Dockerfile -t $image .
  docker run -d --name $container -p 29000:8000 $image | Out-Null
  Start-Sleep -Seconds 3

  Invoke-WebRequest -UseBasicParsing http://127.0.0.1:29000/v1/public | Out-Null
  Invoke-WebRequest -UseBasicParsing http://127.0.0.1:29000/v1/customer | Out-Null

  $login = Invoke-WebRequest -UseBasicParsing http://127.0.0.1:29000/v1/auth/login
  $headerToken = $login.Headers["X-JWT-Token"]
  if (-not $headerToken) { throw "X-JWT-Token header was not returned" }

  $token = ($login.Content | ConvertFrom-Json).token
  if (-not $token) { throw "JWT token not found in response body" }

  Invoke-WebRequest -UseBasicParsing -Headers @{ Authorization = "Bearer $token" } http://127.0.0.1:29000/v1/private | Out-Null

  Write-Host "All Docker+curl tests passed!"
}
finally {
  docker rm -f $container 2>$null | Out-Null
}
