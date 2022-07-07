redis-up:
	docker-compose -f deployments/docker-compose.yaml up -d

redis-down:
	docker-compose -f deployments/docker-compose.yaml down


build-image:
	docker build -t fajrulaulia/coreplause  .

run-image:
	docker run -p 3000:3000 --name coreplause_backend_container  fajrulaulia/coreplause