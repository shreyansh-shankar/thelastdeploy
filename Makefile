# Makefile — OrbStack agent
.PHONY: build run sync start stop check status login logout clean install

build:
	cd agent && go get golang.org/x/term && go build -o ../bin/orbstack .

# Install to /usr/local/bin so `orbstack` works from anywhere.
# Requires sudo on most systems.
install: build
	cp bin/orbstack /usr/local/bin/orbstack
	@echo "Installed: /usr/local/bin/orbstack"

# Quick dev targets — run from repo root
sync: build
	./bin/orbstack sync

start: build
	./bin/orbstack start $(ID)

stop: build
	./bin/orbstack stop

check: build
	./bin/orbstack check

status: build
	./bin/orbstack status

login: build
	./bin/orbstack login

logout: build
	./bin/orbstack logout

clean:
	rm -rf bin/